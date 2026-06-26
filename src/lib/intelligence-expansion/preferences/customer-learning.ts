import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function learnCustomerPreferences(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [knowledgeRes, decisionsRes, tasksRes, patternsRes] = await Promise.all([
    supabase.from("company_knowledge_items").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("company_decision_memory").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(300),
    supabase.from("company_learning_patterns").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You learn customer preferences from company data. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Extract customer preferences.

Return JSON only:
{
  "customers": [
    {
      "customer_segment": "...",
      "preferred_offer": "...",
      "preferred_channel": "...",
      "buying_signals": [],
      "rejected_patterns": [],
      "notes": "...",
      "confidence": 0-100
    }
  ]
}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 12000)}

Decisions:
${JSON.stringify(decisionsRes.data || []).slice(0, 10000)}

Tasks:
${JSON.stringify(tasksRes.data || []).slice(0, 12000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 10000)}
`,
      },
    ],
  });

  let parsed: any = { customers: [] };

  try {
    parsed = JSON.parse(response.content || '{"customers":[]}');
  } catch {
    parsed = { customers: [] };
  }

  const saved = [];

  for (const customer of parsed.customers || []) {
    if (!customer.customer_segment) continue;

    const { data, error } = await supabase
      .from("customer_preference_profiles")
      .insert({
        company_id: companyId,
        customer_segment: customer.customer_segment,
        preferred_offer: customer.preferred_offer || null,
        preferred_channel: customer.preferred_channel || null,
        buying_signals: customer.buying_signals || [],
        rejected_patterns: customer.rejected_patterns || [],
        notes: customer.notes || null,
        confidence: customer.confidence || 50,
        metadata: {
          source: "customer_learning",
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await recordIntelligenceEvent({
      company_id: companyId,
      source_table: "customer_preference_profiles",
      source_id: data.id,
      event_type: "customer_preference_learned",
      title: data.customer_segment,
      summary: data.notes,
      outcome: String(data.confidence),
      importance: data.confidence || 50,
      metadata: data,
    });

    saved.push(data);
  }

  return {
    learned: true,
    customer_count: saved.length,
    customers: saved,
  };
}
