import { NextResponse } from "next/server";
import { buildCompanySummary } from "@/lib/boardroom/company-summary";

export async function GET(req: Request) {
  const companyId =
    new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const summary = await buildCompanySummary(companyId);

  return NextResponse.json(summary);
}
