import { NextResponse } from "next/server";
import { checkSelfHostedHealth } from "@/lib/self-hosted/health";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await checkSelfHostedHealth(companyId);

  return NextResponse.json(result, { status: result.ok ? 200 : 503 });
}
