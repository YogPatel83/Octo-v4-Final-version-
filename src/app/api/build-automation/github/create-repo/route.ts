import { NextResponse } from "next/server";
import { createGitHubRepository } from "@/lib/build-automation/github/create-repository";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.repository_name) {
    return NextResponse.json(
      { error: "company_id and repository_name are required." },
      { status: 400 }
    );
  }

  const result = await createGitHubRepository({
    company_id: body.company_id,
    build_project_id: body.build_project_id || null,
    repository_name: body.repository_name,
    description: body.description || null,
    private: body.private !== false,
    github_token: body.github_token || null,
  });

  return NextResponse.json(result, { status: result.ok ? 200 : 400 });
}
