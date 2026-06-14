import { NextResponse } from "next/server";
import { createContextualQuestions } from "@/lib/builder/contextual-questions";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json({ error: "objective is required." }, { status: 400 });
  }

  return NextResponse.json(
    createContextualQuestions({
      objective: body.objective,
      mode: body.mode || "general",
    })
  );
}
