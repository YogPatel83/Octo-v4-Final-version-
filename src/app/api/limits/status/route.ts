import { NextResponse } from "next/server";
import { getLimitStatus } from "@/lib/limits/enforce-plan-limits";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await getLimitStatus(companyId);

  return NextResponse.json(result);
}
