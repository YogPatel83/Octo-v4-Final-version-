import { createSupabaseAdmin } from "@/lib/supabase/server";
import { classifyBuildAction } from "./risk";

export async function createBuildRun(input: {
  company_id: string;
  build_project_id: string;
  action: string;
  input?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();
  const risk = classifyBuildAction(input.action);

  let approvalId = null;

  if (risk.requires_approval) {
    const { data: approval, error } = await supabase
      .from("approvals")
      .insert({
        company_id: input.company_id,
        title: `Approval required: ${input.action}`,
        description: `Octo needs your approval before it can run ${input.action}.`,
        approval_type: "build_action",
        status: "pending",
        metadata: {
          build_project_id: input.build_project_id,
          action: input.action,
          risk,
        },
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    approvalId = approval.id;
  }

  const { data, error } = await supabase
    .from("build_runs")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id,
      action: input.action,
      status: risk.requires_approval ? "waiting_for_approval" : "queued",
      input: input.input || {},
      requires_approval: risk.requires_approval,
      approval_id: approvalId,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
