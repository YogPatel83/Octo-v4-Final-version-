import { NextResponse } from "next/server";
import { createGeneration } from "@/lib/models/generate";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.audio_url) {
    return NextResponse.json({ error: "company_id and audio_url are required." }, { status: 400 });
  }

  const result = await createGeneration({
    company_id: body.company_id,
    user_id: body.user_id || null,
    type: "stt",
    provider: body.provider || "openai",
    model: body.model || "gpt-4o-transcribe",
    input_url: body.audio_url,
    prompt: body.prompt || null,
    options: body.options || {}
  });

  return NextResponse.json(result);
}
