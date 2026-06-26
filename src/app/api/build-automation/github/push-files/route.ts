import { NextResponse } from "next/server";
import { pushFilesToGitHub } from "@/lib/build-automation/github/push-files";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.repository_connection_id || !Array.isArray(body.files)) {
    return NextResponse.json(
      { error: "company_id, repository_connection_id, and files are required." },
      { status: 400 }
    );
  }

  const result = await pushFilesToGitHub({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    repository_connection_id: body.repository_connection_id,
    files: body.files,
    commit_message: body.commit_message || "Update files from Octo",
    branch: body.branch || "main",
    github_token: body.github_token || null,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
