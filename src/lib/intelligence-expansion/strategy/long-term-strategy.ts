import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function createLongTermStrategyReport(input: {
  company_id: string;
  strategy_period?: string;
}) {
  const supabase = createSupabaseAdmin();

  const [companyRes, tasksRes, knowledgeRes, patternsRes, relationshipsRes] = await Promise.all([
    supabase.from("companies").select("*").eq("id", input.company_id).maybeSingle(),
    supabase.from("tasks").select("*").eq("company_id", input.company_id).order("created_at", { ascending: false }).limit(200),
    supabase.from("company_knowledge_items").select("*").eq("company_id", input.company_id).order("created_at", { ascending: false }).limit(200),
    supabase.from("company_learning_patterns").select("*").eq("company_id", input.company_id).order("created_at", { ascending: false }).limit(200),
    supabase.from("memory_relationships").select("*").eq("company_id", input.company_id).order("created_at", { ascending: false }).limit(200),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You create practical company strategy reports. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Create a long-term strategy report for this company.

Use simple business language.

Return JSON only:
{
  "summary": "...",
  "opportunities": [],
  "risks": [],
  "recommended_moves": [
    {
      "title": "...",
      "reason": "...",
      "next_action": "...",
      "priority": "low|medium|high"
    }
  ]
}

Strategy period:
${input.strategy_period || "90_days"}

Company:
${JSON.stringify(companyRes.data || {}).slice(0, 5000)}

Tasks:
${JSON.stringify(tasksRes.data || []).slice(0, 10000)}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 12000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 12000)}

Relationships:
${JSON.stringify(relationshipsRes.data || []).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = {};

  try {
    parsed = JSON.parse(response.content || "{}");
  } catch {
    parsed = {
      summary: "Strategy report could not be parsed.",
      opportunities: [],
      risks: [],
      recommended_moves: [],
    };
  }

  const { data, error } = await supabase
    .from("long_term_strategy_reports")
    .insert({
      company_id: input.company_id,
      strategy_period: input.strategy_period || "90_days",
      summary: parsed.summary || null,
      opportunities: parsed.opportunities || [],
      risks: parsed.risks || [],
      recommended_moves: parsed.recommended_moves || [],
      evidence: {
        company: companyRes.data || null,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "long_term_strategy_reports",
    source_id: data.id,
    event_type: "long_term_strategy_created",
    title: "Long-term strategy created",
    summary: data.summary,
    outcome: input.strategy_period || "90_days",
    importance: 90,
    metadata: data,
  });

  return data;
}
