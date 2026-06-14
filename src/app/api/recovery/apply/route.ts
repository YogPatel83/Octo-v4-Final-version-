import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createRecoveryPlan } from "@/lib/recovery/create-recovery-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.failure_type) {
    return NextResponse.json(
      { error: "company_id and failure_type are required." },
      { status: 400 }
    );
  }

  const plan = createRecoveryPlan({
    failure_type: body.failure_type,
    failed_resource_type: body.failed_resource_type,
    failed_resource_id: body.failed_resource_id,
    error_message: body.error_message,
  });

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("approvals")
    .insert({
      company_id: body.company_id,
      title: "Failure recovery requires review",
      description: JSON.stringify(plan),
      approval_type: "failure_recovery",
      status: "pending",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    recovery_plan: plan,
    approval: data,
  });
}
