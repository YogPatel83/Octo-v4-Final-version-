import { NextResponse } from "next/server";
import { createTaskPlan } from "@/lib/planning/create-task-plan";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.objective) {
    return NextResponse.json(
      { error: "company_id and objective are required." },
      { status: 400 }
    );
  }

  const result = createTaskPlan({
    company_id: body.company_id,
    objective: body.objective,
  });

  return NextResponse.json({ plan: result });
}
