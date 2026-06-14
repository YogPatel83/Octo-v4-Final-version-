import { NextResponse } from "next/server";
import { analyzeCompanyBrain } from "@/lib/company-brain/analyze-company-brain";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await analyzeCompanyBrain(body.company_id);

  return NextResponse.json({ company_brain: result });
}
