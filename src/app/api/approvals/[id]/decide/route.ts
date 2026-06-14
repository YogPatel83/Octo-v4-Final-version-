import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/audit/log";
import { resumeAfterApproval } from "@/lib/approvals/resume-after-approval";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();
  const decision = body.decision;

  if (!["approved", "rejected"].includes(decision)) {
    return NextResponse.json(
      { error: "Decision must be approved or rejected." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("approvals")
    .update({
      status: decision,
      decided_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await createAuditLog({
    company_id: data.company_id,
    action: `approval_${decision}`,
    metadata: {
      approval_id: data.id,
      task_id: data.task_id || null,
    },
  });

  if (decision === "rejected" && data.task_id) {
    await supabase
      .from("tasks")
      .update({
        status: "rejected",
      })
      .eq("id", data.task_id);
  }

  if (decision === "approved" && body.auto_resume !== false) {
    const resumed = await resumeAfterApproval({ approval_id: id });

    return NextResponse.json({
      approval: data,
      resumed,
    });
  }

  return NextResponse.json({ approval: data });
}
