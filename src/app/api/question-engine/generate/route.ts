import { NextResponse } from "next/server";
import { generateLLMQuestions } from "@/lib/question-engine/llm-question-engine";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json({ error: "objective is required." }, { status: 400 });
  }

  const result = await generateLLMQuestions({
    objective: body.objective,
    company_context: body.company_context || {},
    mode: body.mode || "builder",
  });

  return NextResponse.json(result);
}
