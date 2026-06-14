import { NextResponse } from "next/server";
import { createGeneration } from "@/lib/models/generate";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.text) {
    return NextResponse.json({ error: "company_id and text are required." }, { status: 400 });
  }

  const result = await createGeneration({
    company_id: body.company_id,
    user_id: body.user_id || null,
    type: "tts",
    provider: body.provider || "openai",
    model: body.model || "gpt-4o-mini-tts",
    prompt: body.text,
    options: {
      voice: body.voice || "alloy",
      format: body.format || "mp3",
      ...(body.options || {})
    }
  });

  return NextResponse.json(result);
}
