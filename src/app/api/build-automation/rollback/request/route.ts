import { NextResponse } from "next/server";
import { requestDeploymentRollback } from "@/lib/build-automation/rollback/request-rollback";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const rollback = await requestDeploymentRollback({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    deployment_id: body.deployment_id || null,
    rollback_to_deployment_id: body.rollback_to_deployment_id || null,
    reason: body.reason || null,
    requested_by_user_id: body.requested_by_user_id || null,
  });

  return NextResponse.json({ rollback });
}
