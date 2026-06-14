import { NextResponse } from "next/server";
import { evaluateExecutionPolicy } from "@/lib/policies/evaluate-policy";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.action_type) {
    return NextResponse.json({ error: "action_type is required." }, { status: 400 });
  }

  const result = evaluateExecutionPolicy({
    action_type: body.action_type,
    amount_cents: body.amount_cents,
    risk_level: body.risk_level,
  });

  return NextResponse.json(result);
}
