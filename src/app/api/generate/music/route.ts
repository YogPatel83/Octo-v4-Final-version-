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
    type: "music",
    provider: body.provider || "elevenlabs",
    model: body.model || "music",
    prompt: body.prompt,
    options: body.options || {}
  });

  return NextResponse.json(result);
}
