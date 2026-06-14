import { NextResponse } from "next/server";
import { extractTextFromUrl } from "@/lib/files/extract-text";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.file_url || !body.file_name) {
    return NextResponse.json(
      { error: "file_url and file_name are required." },
      { status: 400 }
    );
  }

  const text = await extractTextFromUrl({
    file_url: body.file_url,
    file_name: body.file_name,
    mime_type: body.mime_type,
  });

  return NextResponse.json({
    file_name: body.file_name,
    characters: text.length,
    text,
  });
}
