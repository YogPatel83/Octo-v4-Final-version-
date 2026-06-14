import { NextResponse } from "next/server";
import { createRecoveryPlan } from "@/lib/recovery/create-recovery-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.failure_type) {
    return NextResponse.json({ error: "failure_type is required." }, { status: 400 });
  }

  const plan = createRecoveryPlan({
    failure_type: body.failure_type,
    failed_resource_type: body.failed_resource_type,
    failed_resource_id: body.failed_resource_id,
    error_message: body.error_message,
  });

  return NextResponse.json({ recovery_plan: plan });
}
