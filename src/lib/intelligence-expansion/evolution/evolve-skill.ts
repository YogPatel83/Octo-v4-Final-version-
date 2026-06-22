import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function evolveGeneratedSkill(input: {
  company_id: string;
  generated_skill_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const [skillRes, eventsRes, patternsRes] = await Promise.all([
    supabase
      .from("generated_skills")
      .select("*")
      .eq("id", input.generated_skill_id)
      .maybeSingle(),
    supabase
      .from("intelligence_events")
      .select("*")
      .eq("company_id", input.company_id)
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("company_learning_patterns")
      .select("*")
      .eq("company_id", input.company_id)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  if (!skillRes.data) {
    return {
      evolved: false,
      reason: "Skill not found.",
    };
  }

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You improve reusable business skills. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Improve this generated skill using company learning.

Rules:
- Do not invent unsupported facts.
- Suggest concrete step changes.
- Keep steps simple and business-readable.
- Return JSON only.

Shape:
{
  "score": 0-100,
  "recommendation": "...",
  "suggested_changes": {
    "name": "...",
    "description": "...",
    "steps": []
  }
}

Skill:
${JSON.stringify(skillRes.data).slice(0, 8000)}

Recent Events:
${JSON.stringify(eventsRes.data || []).slice(0, 12000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = {};

  try {
    parsed = JSON.parse(response.content || "{}");
  } catch {
    parsed = {
      score: 50,
      recommendation: "Could not parse AI recommendation.",
      suggested_changes: {},
    };
  }

  const { data, error } = await supabase
    .from("skill_evolution_reports")
    .insert({
      company_id: input.company_id,
      generated_skill_id: input.generated_skill_id,
      score: parsed.score || 50,
      recommendation: parsed.recommendation || null,
      suggested_changes: parsed.suggested_changes || {},
      status: "draft",
      metadata: {
        raw: parsed,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "skill_evolution_reports",
    source_id: data.id,
    event_type: "skill_evolved",
    title: `Skill evolution: ${skillRes.data.name}`,
    summary: data.recommendation,
    outcome: String(data.score),
    importance: data.score || 50,
    metadata: data,
  });

  return {
    evolved: true,
    report: data,
  };
}
