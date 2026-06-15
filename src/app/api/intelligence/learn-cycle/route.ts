import { NextResponse } from "next/server";
import { runCompanyIntelligenceCycle } from "@/lib/intelligence/coordinator";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await runCompanyIntelligenceCycle(body.company_id);

  return NextResponse.json(result);
}
