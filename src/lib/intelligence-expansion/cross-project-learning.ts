import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { discoverCompanyPatterns } from "./pattern-engine";

export async function runCrossProjectLearning(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [buildsRes, workflowsRes, tasksRes, patternsResult] = await Promise.all([
    supabase.from("build_projects").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
    supabase.from("workflows").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(100),
    supabase.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(300),
    discoverCompanyPatterns(companyId),
  ]);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You create cross-project learning recommendations. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Analyze the company's projects and produce recommendations.

Rules:
- Look across builds, workflows, and tasks.
- Find what should be repeated.
- Find what should be avoided.
- Recommend improvements.
- Return JSON only.

Shape:
{
  "recommendations": [
    {
      "title": "...",
      "reason": "...",
      "action": "...",
      "priority": "low|medium|high"
    }
  ]
}

Build Projects:
${JSON.stringify(buildsRes.data || []).slice(0, 10000)}

Workflows:
${JSON.stringify(workflowsRes.data || []).slice(0, 10000)}

Tasks:
${JSON.stringify(tasksRes.data || []).slice(0, 12000)}

Patterns:
${JSON.stringify(patternsResult.patterns || []).slice(0, 10000)}
`,
      },
    ],
  });

  let parsed: any = { recommendations: [] };

  try {
    parsed = JSON.parse(response.content || '{"recommendations":[]}');
  } catch {
    parsed = { recommendations: [] };
  }

  const { data, error } = await supabase
    .from("cross_project_learning_reports")
    .insert({
      company_id: companyId,
      projects_analyzed: (buildsRes.data || []).length + (workflowsRes.data || []).length,
      patterns_found: patternsResult.patterns_found || 0,
      recommendations: parsed.recommendations || [],
      output: {
        patterns: patternsResult.patterns || [],
        raw: parsed,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
