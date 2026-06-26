import { NextResponse } from "next/server";
import { listBuildDeployments } from "@/lib/build-automation/vercel/history";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const deployments = await listBuildDeployments(companyId);

  return NextResponse.json({ deployments });
}
