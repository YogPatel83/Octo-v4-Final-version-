import { NextResponse } from "next/server";
import { getCompanyIntelligenceProfile } from "@/lib/intelligence/profile";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const profile = await getCompanyIntelligenceProfile(companyId);

  return NextResponse.json({ profile });
}
