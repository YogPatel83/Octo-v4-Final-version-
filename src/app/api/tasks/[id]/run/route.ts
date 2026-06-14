import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { detectTaskRisk } from "@/lib/tasks/risk";
import { createAuditLog } from "@/lib/audit/log";

export async function POST(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = createSupabaseAdmin();

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (taskError) {
    return NextResponse.json({ error: taskError.message }, { status: 500 });
  }

  const risk = detectTaskRisk(task.title, task.input);

  if (risk.requires_approval) {
    const { data: approval, error: approvalError } = await supabase
      .from("approvals")
      .insert({
        company_id: task.company_id,
        task_id: task.id,
        title: `Approval required: ${task.title}`,
        description: `This task needs human approval before running. Reasons: ${risk.reasons.join(", ")}`,
        approval_type: "high_risk_task",
        status: "pending",
      })
      .select()
      .single();

    if (approvalError) {
      return NextResponse.json({ error: approvalError.message }, { status: 500 });
    }

    await supabase
      .from("tasks")
      .update({
        status: "waiting_for_approval",
        risk_level: "high",
      })
      .eq("id", id);

    await createAuditLog({
      company_id: task.company_id,
      action: "task_blocked_for_approval",
      metadata: {
        task_id: task.id,
        approval_id: approval.id,
        reasons: risk.reasons,
      },
    });

    return NextResponse.json({
      status: "waiting_for_approval",
      approval,
    });
  }

  const { data: updated, error: updateError } = await supabase
    .from("tasks")
    .update({
      status: "queued",
      risk_level: "low",
    })
    .eq("id", id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  await createAuditLog({
    company_id: task.company_id,
    action: "task_queued",
    metadata: {
      task_id: task.id,
    },
  });

  return NextResponse.json({ task: updated });
}
