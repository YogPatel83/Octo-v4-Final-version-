import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function learnSupplierPreferences(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [knowledgeRes, decisionsRes, eventsRes] = await Promise.all([
    supabase.from("company_knowledge_items").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("company_decision_memory").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("intelligence_events").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(300),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You learn supplier preferences from company data. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Extract supplier preferences.

Return JSON only:
{
  "suppliers": [
    {
      "supplier_name": "...",
      "supplier_channel": "...",
      "country": "...",
      "preference_score": 0-100,
      "strengths": [],
      "weaknesses": [],
      "notes": "..."
    }
  ]
}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 12000)}

Decisions:
${JSON.stringify(decisionsRes.data || []).slice(0, 10000)}

Events:
${JSON.stringify(eventsRes.data || []).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = { suppliers: [] };

  try {
    parsed = JSON.parse(response.content || '{"suppliers":[]}');
  } catch {
    parsed = { suppliers: [] };
  }

  const saved = [];

  for (const supplier of parsed.suppliers || []) {
    if (!supplier.supplier_name) continue;

    const { data, error } = await supabase
      .from("supplier_preference_profiles")
      .insert({
        company_id: companyId,
        supplier_name: supplier.supplier_name,
        supplier_channel: supplier.supplier_channel || null,
        country: supplier.country || null,
        preference_score: supplier.preference_score || 50,
        strengths: supplier.strengths || [],
        weaknesses: supplier.weaknesses || [],
        notes: supplier.notes || null,
        metadata: {
          source: "supplier_learning",
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await recordIntelligenceEvent({
      company_id: companyId,
      source_table: "supplier_preference_profiles",
      source_id: data.id,
      event_type: "supplier_preference_learned",
      title: data.supplier_name,
      summary: data.notes,
      outcome: String(data.preference_score),
      importance: data.preference_score || 50,
      metadata: data,
    });

    saved.push(data);
  }

  return {
    learned: true,
    supplier_count: saved.length,
    suppliers: saved,
  };
}
