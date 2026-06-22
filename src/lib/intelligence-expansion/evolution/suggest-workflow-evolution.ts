import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function suggestWorkflowEvolution(input: {
  company_id: string;
  workflow_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const [workflowRes, stepsRes, reportsRes, patternsRes] = await Promise.all([
    supabase.from("workflows").select("*").eq("id", input.workflow_id).maybeSingle(),
    supabase.from("workflow_steps").select("*").eq("workflow_id", input.workflow_id).limit(100),
    supabase.from("workflow_evolution_reports").select("*").eq("workflow_id", input.workflow_id).limit(20),
    supabase.from("company_learning_patterns").select("*").eq("company_id", input.company_id).limit(100),
  ]);

  if (!workflowRes.data) {
    return {
      suggested: false,
      reason: "Workflow not found.",
    };
  }

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You improve business workflows. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Suggest an improved version of this workflow.

Rules:
- Keep the workflow business-readable.
- Add approval gates where risk exists.
- Remove unnecessary steps.
- Make the workflow more likely to succeed.
- Return JSON only.

Shape:
{
  "title": "...",
  "reason": "...",
  "suggested_steps": [
    {
      "name": "...",
      "description": "...",
      "requires_approval": true
    }
  ],
  "expected_improvement": "..."
}

Workflow:
${JSON.stringify(workflowRes.data).slice(0, 8000)}

Steps:
${JSON.stringify(stepsRes.data || []).slice(0, 10000)}

Reports:
${JSON.stringify(reportsRes.data || []).slice(0, 8000)}

Patterns:
${JSON.stringify(patternsRes.data || []).slice(0, 10000)}
`,
      },
    ],
  });

  let parsed: any = {};

  try {
    parsed = JSON.parse(response.content || "{}");
  } catch {
    parsed = {
      title: "Workflow improvement",
      reason: "Could not parse AI recommendation.",
      suggested_steps: [],
      expected_improvement: null,
    };
  }

  const { data, error } = await supabase
    .from("workflow_evolution_suggestions")
    .insert({
      company_id: input.company_id,
      workflow_id: input.workflow_id,
      title: parsed.title || "Workflow improvement",
      reason: parsed.reason || null,
      suggested_steps: parsed.suggested_steps || [],
      expected_improvement: parsed.expected_improvement || null,
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
    source_table: "workflow_evolution_suggestions",
    source_id: data.id,
    event_type: "workflow_evolution_suggested",
    title: data.title,
    summary: data.reason,
    outcome: "draft",
    importance: 80,
    metadata: data,
  });

  return {
    suggested: true,
    suggestion: data,
  };
}
