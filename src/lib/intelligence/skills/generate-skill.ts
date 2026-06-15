import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function generateSkillFromCompanyLearning(input: {
  company_id: string;
  objective?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const [eventsRes, knowledgeRes] = await Promise.all([
    supabase
      .from("intelligence_events")
      .select("*")
      .eq("company_id", input.company_id)
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("company_knowledge_items")
      .select("*")
      .eq("company_id", input.company_id)
      .order("created_at", { ascending: false })
      .limit(50),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You create reusable business automation skills from company learning. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Create one reusable Octo skill from these company events and knowledge.

Rules:
- The skill must be useful for repeated company work.
- Do not create a skill if there is no repeated pattern.
- Return JSON only.

Shape:
{
  "should_create": true,
  "name": "...",
  "description": "...",
  "trigger_pattern": "...",
  "steps": [
    { "name": "...", "description": "...", "requires_approval": true }
  ]
}

Objective:
${input.objective || "Create the most useful skill from this company's learning."}

Events:
${JSON.stringify(eventsRes.data || []).slice(0, 12000)}

Knowledge:
${JSON.stringify(knowledgeRes.data || []).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = {};
  try {
    parsed = JSON.parse(response.content || "{}");
  } catch {
    parsed = { should_create: false };
  }

  if (!parsed.should_create) {
    return {
      created: false,
      reason: "No strong repeated pattern found.",
      raw: response.content,
    };
  }

  const { data, error } = await supabase
    .from("generated_skills")
    .insert({
      company_id: input.company_id,
      name: parsed.name || "Generated Skill",
      description: parsed.description || null,
      trigger_pattern: parsed.trigger_pattern || null,
      steps: parsed.steps || [],
      status: "draft",
      metadata: {
        objective: input.objective || null,
        raw: parsed,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "generated_skills",
    source_id: data.id,
    event_type: "skill_created",
    title: data.name,
    summary: data.description,
    outcome: "draft",
    importance: 85,
    metadata: {
      steps: data.steps,
    },
  });

  return {
    created: true,
    skill: data,
  };
}
