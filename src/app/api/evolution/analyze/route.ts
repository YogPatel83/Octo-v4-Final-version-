import { NextResponse } from "next/server";
import { analyzeCompany } from "@/lib/evolution/analyze-company";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const analysis =
    await analyzeCompany(body.company_id);

  return NextResponse.json({
    analysis
  });
}
