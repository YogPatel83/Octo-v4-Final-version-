import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function discoverCompanyPatterns(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [tasksRes, approvalsRes, knowledgeRes, eventsRes] = await Promise.all([
    supabase.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("approvals").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("company_knowledge_items").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(200),
    supabase.from("intelligence_events").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(300),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You identify reusable company operating patterns. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Find useful patterns from this company's work.

Rules:
- Identify repeated success patterns.
- Identify repeated failure patterns.
- Identify preferred styles, channels, suppliers, tasks, workflows, approvals, and decisions.
- Do not invent facts.
- Return JSON only.

Shape:
{
  "patterns": [
    {
      "pattern_type": "success|failure|preference|supplier|customer|workflow|approval|general",
      "title": "...",
      "description": "...",
      "confidence": 0-100,
      "evidence": []
    }
  ]
}

Tasks:
${JSON.stringify(tasksRes.data || []).slice(0, 10000)}

Approvals:
${JSON.stringify(approvalsRes.data || []).slice(0, 10000)}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 10000)}

Events:
${JSON.stringify(eventsRes.data || []).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = { patterns: [] };

  try {
    parsed = JSON.parse(response.content || '{"patterns":[]}');
  } catch {
    parsed = { patterns: [] };
  }

  const saved = [];

  for (const pattern of parsed.patterns || []) {
    if (!pattern.title) continue;

    const { data, error } = await supabase
      .from("company_learning_patterns")
      .insert({
        company_id: companyId,
        pattern_type: pattern.pattern_type || "general",
        title: pattern.title,
        description: pattern.description || null,
        evidence: pattern.evidence || [],
        confidence: pattern.confidence || 50,
        status: "active",
        metadata: {
          source: "pattern_engine",
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await recordIntelligenceEvent({
      company_id: companyId,
      source_table: "company_learning_patterns",
      source_id: data.id,
      event_type: "pattern_discovered",
      title: data.title,
      summary: data.description,
      outcome: data.pattern_type,
      importance: data.confidence || 50,
      metadata: data,
    });

    saved.push(data);
  }

  return {
    patterns_found: saved.length,
    patterns: saved,
  };
}
