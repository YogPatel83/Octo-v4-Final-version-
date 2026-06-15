import { createSupabaseAdmin } from "@/lib/supabase/server";
import { recordIntelligenceEvent } from "@/lib/intelligence/record-event";

export async function evolveWorkflow(input: {
  company_id: string;
  workflow_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const [workflowRes, tasksRes, approvalsRes, eventsRes] = await Promise.all([
    supabase.from("workflows").select("*").eq("id", input.workflow_id).maybeSingle(),
    supabase.from("tasks").select("*").eq("company_id", input.company_id).eq("workflow_id", input.workflow_id).limit(200),
    supabase.from("approvals").select("*").eq("company_id", input.company_id).limit(200),
    supabase.from("intelligence_events").select("*").eq("company_id", input.company_id).eq("source_id", input.workflow_id).limit(100),
  ]);

  const tasks = tasksRes.data || [];
  const approvals = approvalsRes.data || [];
  const events = eventsRes.data || [];

  const successCount = tasks.filter((task) => ["completed", "approved", "success"].includes(task.status)).length;
  const failureCount = tasks.filter((task) => ["failed", "error"].includes(task.status)).length;
  const approvalCount = approvals.filter((approval) => approval.status === "approved").length;
  const rejectionCount = approvals.filter((approval) => approval.status === "rejected").length;

  const total = Math.max(1, successCount + failureCount + approvalCount + rejectionCount);
  const score = Math.max(
    0,
    Math.min(
      100,
      Math.round(((successCount + approvalCount) / total) * 100 - rejectionCount * 5)
    )
  );

  let recommendation = "Keep workflow as-is.";

  if (score < 40) recommendation = "Workflow is weak. Reduce steps, add approval gates, or replace with a better workflow.";
  if (score >= 40 && score < 70) recommendation = "Workflow is average. Improve prompts, tools, and routing.";
  if (score >= 70) recommendation = "Workflow is performing well. Prefer this workflow for similar future work.";

  const { data, error } = await supabase
    .from("workflow_evolution_reports")
    .upsert(
      {
        company_id: input.company_id,
        workflow_id: input.workflow_id,
        success_count: successCount,
        failure_count: failureCount,
        approval_count: approvalCount,
        rejection_count: rejectionCount,
        score,
        recommendation,
        metadata: {
          workflow: workflowRes.data || null,
          sampled_tasks: tasks.slice(0, 20),
          sampled_events: events.slice(0, 20),
        },
        updated_at: new Date().toISOString(),
      },
      { onConflict: "workflow_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  await recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "workflow_evolution_reports",
    source_id: data.id,
    event_type: "workflow_evolved",
    title: workflowRes.data?.name || "Workflow evolved",
    summary: recommendation,
    outcome: String(score),
    importance: score,
    metadata: data,
  });

  return data;
}
