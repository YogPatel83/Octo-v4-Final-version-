import { NextResponse } from "next/server";
import { createLongTermStrategyReport } from "@/lib/intelligence-expansion/strategy/long-term-strategy";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const report = await createLongTermStrategyReport({
    company_id: body.company_id,
    strategy_period: body.strategy_period || "90_days",
  });

  return NextResponse.json({ report });
}
