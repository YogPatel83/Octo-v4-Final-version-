import { NextResponse } from "next/server";
import { calculateRoiScore } from "@/lib/roi/score";

export async function POST(req: Request) {
  const body = await req.json();

  const result = calculateRoiScore({
    expected_revenue_cents: body.expected_revenue_cents,
    expected_savings_cents: body.expected_savings_cents,
    estimated_cost_cents: body.estimated_cost_cents,
    risk_level: body.risk_level || "medium",
  });

  return NextResponse.json(result);
}
