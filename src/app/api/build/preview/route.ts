import { NextResponse } from "next/server";
import { createBuildRun } from "@/lib/build/create-build-run";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.build_project_id) {
    return NextResponse.json(
      { error: "company_id and build_project_id are required." },
      { status: 400 }
    );
  }

  const run = await createBuildRun({
    company_id: body.company_id,
    build_project_id: body.build_project_id,
    action: "create_preview",
    input: body.input || {},
  });

  return NextResponse.json({ run });
}
