import { NextResponse } from "next/server";
import { generateImage } from "@/lib/media/generate-image";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.prompt) {
    return NextResponse.json(
      { error: "company_id and prompt are required." },
      { status: 400 }
    );
  }

  const result = await generateImage({
    company_id: body.company_id,
    user_id: body.user_id || null,
    provider: body.provider || "google",
    model: body.model || "gemini-image",
    prompt: body.prompt
  });

  return NextResponse.json(result);
}
