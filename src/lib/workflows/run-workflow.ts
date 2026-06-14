import { createSupabaseAdmin } from "@/lib/supabase/server";
import { executeAgent } from "@/lib/agents/execute-agent";
import { createAuditLog } from "@/lib/audit/log";

export async function runWorkflow(input: {
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
          title: `Workflow approval required: ${workflow.name}`,
          description: `Step ${step.step_order} requires approval before continuing: ${step.action}`,
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

    const { data: agent, error: agentError } = await supabase
      .from("agents")
      .select("*")
      .eq("id", step.agent_id)
      .single();

    if (agentError) throw new Error(agentError.message);

    const result = await executeAgent({
      agent,
      task: {
        title: step.action,
        input: {
          workflow_name: workflow.name,
          trigger_type: workflow.trigger_type,
          payload: input.payload || {},
          previous_results: results,
        },
      },
    });

    results.push({
      step_id: step.id,
      agent_id: agent.id,
      status: "completed",
      result,
    });
  }

  await createAuditLog({
    company_id: workflow.company_id,
    action: "workflow_run",
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
