import { NextResponse } from "next/server";
import { listBuildDomains } from "@/lib/build-automation/domains/domain-management";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const domains = await listBuildDomains(companyId);

  return NextResponse.json({ domains });
}
