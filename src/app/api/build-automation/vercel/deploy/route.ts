import { NextResponse } from "next/server";
import { deployVercelProject } from "@/lib/build-automation/vercel/deploy-project";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.project_name) {
    return NextResponse.json(
      { error: "company_id and project_name are required." },
      { status: 400 }
    );
  }

  const result = await deployVercelProject({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    repository_connection_id: body.repository_connection_id || null,
    project_name: body.project_name,
    git_repository: body.git_repository || null,
    environment: body.environment || "preview",
    approved_by_user_id: body.approved_by_user_id || null,
    vercel_token: body.vercel_token || null,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
