import { NextResponse } from "next/server";
import { analyzeDecision } from "@/lib/boardroom/analyze-decision";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.title) {
    return NextResponse.json(
      { error: "company_id and title are required." },
      { status: 400 }
    );
  }

  const result = await analyzeDecision({
    company_id: body.company_id,
    title: body.title,
    description: body.description,
    expected_revenue_cents: body.expected_revenue_cents,
    expected_savings_cents: body.expected_savings_cents,
    estimated_cost_cents: body.estimated_cost_cents,
    risk_level: body.risk_level || "medium",
  });

  return NextResponse.json(result);
}
