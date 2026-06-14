import { createSupabaseAdmin } from "@/lib/supabase/server";
import { runAgentRuntime } from "./run-agent";

export async function runWorkflowRuntime(input: {
  workflow_id: string;
  payload?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data: workflow, error: workflowError } = await supabase
    .from("workflows")
    .select("*")
    .eq("id", input.workflow_id)
    .single();

  if (workflowError) throw new Error(workflowError.message);

  const { data: steps, error: stepsError } = await supabase
    .from("workflow_steps")
    .select("*")
    .eq("workflow_id", input.workflow_id)
    .order("step_order", { ascending: true });

  if (stepsError) throw new Error(stepsError.message);

  const results = [];

  for (const step of steps || []) {
    if (step.requires_approval) {
      const { data: approval, error: approvalError } = await supabase
        .from("approvals")
        .insert({
          company_id: workflow.company_id,
          title: `Approval required: ${step.action}`,
          description: `Workflow ${workflow.name} needs approval before this step continues.`,
          approval_type: "workflow_step",
          status: "pending",
        })
        .select()
        .single();

      if (approvalError) throw new Error(approvalError.message);

      results.push({
        step_id: step.id,
        status: "waiting_for_approval",
        approval,
      });

      break;
    }

    if (!step.agent_id) {
      results.push({
        step_id: step.id,
        status: "skipped",
        reason: "No agent assigned.",
      });
      continue;
    }

    const result = await runAgentRuntime({
      agent_id: step.agent_id,
      title: step.action,
      payload: {
        workflow_id: workflow.id,
        workflow_name: workflow.name,
        previous_results: results,
        ...(input.payload || {}),
      },
    });

    results.push({
      step_id: step.id,
      status: "completed",
      result,
    });
  }

  await supabase.from("execution_events").insert({
    company_id: workflow.company_id,
    event_type: "workflow_runtime_completed",
    message: workflow.name,
    metadata: {
      workflow_id: workflow.id,
      results,
    },
  });

  return {
    workflow,
    results,
  };
}
