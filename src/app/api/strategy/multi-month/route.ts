import { NextResponse } from "next/server";
import { createMultiMonthPlan } from "@/lib/strategy/multi-month-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const plan = createMultiMonthPlan({
    company_id: body.company_id,
    objective: body.objective,
    months: body.months || 3,
  });

  return NextResponse.json({ plan });
}
