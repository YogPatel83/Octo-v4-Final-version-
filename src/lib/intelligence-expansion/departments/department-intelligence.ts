import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function analyzeDepartmentIntelligence(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [agentsRes, teamsRes, workflowsRes, tasksRes, patternsRes] = await Promise.all([
    supabase.from("agents").select("*").eq("company_id", companyId).limit(200),
    supabase.from("teams").select("*").eq("company_id", companyId).limit(200),
    supabase.from("workflows").select("*").eq("company_id", companyId).limit(200),
    supabase.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(300),
    supabase.from("company_learning_patterns").select("*").eq("company_id", companyId).limit(200),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You analyze company departments and recommend improvements. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Create department intelligence profiles.

Use simple business language.

Return JSON only:
{
  "departments": [
    {
      "department_name": "Marketing|Sales|Finance|Operations|Product|Legal|Support|Engineering|General",
      "health_score": 0-100,
      "strengths": [],
      "weaknesses": [],
      "recommended_actions": [],
      "learned_summary": "..."
    }
  ]
}

Agents:
${JSON.stringify(agentsRes.data || []).slice(0, 10000)}

Teams:
${JSON.stringify(teamsRes.data || []).slice(0, 10000)}

Workflows:
${JSON.stringify(workflowsRes.data || []).slice(0, 10000)}

Tasks:
${JSON.stringify(tasksRes.data || []).slice(0, 12000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 10000)}
`,
      },
    ],
  });

  let parsed: any = { departments: [] };

  try {
    parsed = JSON.parse(response.content || '{"departments":[]}');
  } catch {
    parsed = { departments: [] };
  }

  const saved = [];

  for (const dept of parsed.departments || []) {
    if (!dept.department_name) continue;

    const { data, error } = await supabase
      .from("department_intelligence_profiles")
      .insert({
        company_id: companyId,
        department_name: dept.department_name,
        health_score: dept.health_score || 50,
        strengths: dept.strengths || [],
        weaknesses: dept.weaknesses || [],
        recommended_actions: dept.recommended_actions || [],
        learned_summary: dept.learned_summary || null,
        metadata: {
          source: "department_intelligence",
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    await recordIntelligenceEvent({
      company_id: companyId,
      source_table: "department_intelligence_profiles",
      source_id: data.id,
      event_type: "department_intelligence_created",
      title: data.department_name,
      summary: data.learned_summary,
      outcome: String(data.health_score),
      importance: data.health_score || 50,
      metadata: data,
    });

    saved.push(data);
  }

  return {
    analyzed: true,
    department_count: saved.length,
    departments: saved,
  };
}
