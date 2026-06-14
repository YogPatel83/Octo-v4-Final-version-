import { NextResponse } from "next/server";
import { MEDIA_MODELS } from "@/lib/media/models";

export async function GET() {
  return NextResponse.json({
    models: MEDIA_MODELS
  });
}
