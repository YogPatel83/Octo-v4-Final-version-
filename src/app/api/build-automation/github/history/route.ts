import { NextResponse } from "next/server";
import { listGitHubBuildAutomationHistory } from "@/lib/build-automation/github/history";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const history = await listGitHubBuildAutomationHistory(companyId);

  return NextResponse.json(history);
}
