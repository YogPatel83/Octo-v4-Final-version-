import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/audit/log";

export async function resumeAfterApproval(input: {
  approval_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: approval, error: approvalError } = await supabase
    .from("approvals")
    .select("*")
    .eq("id", input.approval_id)
    .single();

  if (approvalError) throw new Error(approvalError.message);

  if (approval.status !== "approved") {
    return {
      resumed: false,
      reason: "Approval is not approved.",
      approval,
    };
  }

  if (!approval.task_id) {
    await createAuditLog({
      company_id: approval.company_id,
      action: "approval_resumed_without_task",
      metadata: {
        approval_id: approval.id,
      },
    });

    return {
      resumed: true,
      type: "manual_only",
      approval,
    };
  }

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .update({
      status: "queued",
      risk_level: "approved_high",
    })
    .eq("id", approval.task_id)
    .select()
    .single();

  if (taskError) throw new Error(taskError.message);

  await createAuditLog({
    company_id: approval.company_id,
    action: "approval_resumed_task",
    metadata: {
      approval_id: approval.id,
      task_id: task.id,
    },
  });

  return {
    resumed: true,
    type: "task",
    approval,
    task,
  };
}
