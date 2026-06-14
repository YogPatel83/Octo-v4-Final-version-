import { NextResponse } from "next/server";
import { decomposeGoal } from "@/lib/planning/decompose-goal";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json({ error: "objective is required." }, { status: 400 });
  }

  const result = decomposeGoal({
    objective: body.objective,
  });

  return NextResponse.json({ decomposition: result });
}
