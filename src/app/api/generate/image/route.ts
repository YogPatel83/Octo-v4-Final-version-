import { NextResponse } from "next/server";
import { createGeneration } from "@/lib/models/generate";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.prompt) {
    return NextResponse.json({ error: "company_id and prompt are required." }, { status: 400 });
  }

  const result = await createGeneration({
    company_id: body.company_id,
    user_id: body.user_id || null,
    type: "image",
    provider: body.provider || "openai",
    model: body.model || "gpt-image-2",
    prompt: body.prompt,
    options: body.options || {}
  });

  return NextResponse.json(result);
}
