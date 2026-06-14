import { NextResponse } from "next/server";
import { planSwarms } from "@/lib/multi-swarm/plan-swarms";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const result = await planSwarms({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json({ swarm_plan: result });
}
