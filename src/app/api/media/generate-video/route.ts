import { NextResponse } from "next/server";
import { generateVideo } from "@/lib/media/generate-video";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.prompt) {
    return NextResponse.json(
      { error: "company_id and prompt are required." },
      { status: 400 }
    );
  }

  const result = await generateVideo({
    company_id: body.company_id,
    user_id: body.user_id || null,
    provider: body.provider || "google",
    model: body.model || "veo",
    prompt: body.prompt,
    reference_image_url: body.reference_image_url || null
  });

  return NextResponse.json(result);
}
