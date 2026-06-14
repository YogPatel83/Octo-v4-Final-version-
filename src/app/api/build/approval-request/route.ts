import { NextResponse } from "next/server";
import { createBuildRun } from "@/lib/build/create-build-run";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.build_project_id || !body.action) {
    return NextResponse.json(
      { error: "company_id, build_project_id, and action are required." },
      { status: 400 }
    );
  }

  const run = await createBuildRun({
    company_id: body.company_id,
    build_project_id: body.build_project_id,
    action: body.action,
    input: body.input || {},
  });

  return NextResponse.json({
    run,
    message: "Approval request created if this action requires human approval.",
  });
}
