import { NextResponse } from "next/server";
import { extractTextFromUrl } from "@/lib/files/extract-text";
import { ingestTextToMemory } from "@/lib/rag/ingest-text";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.file_url || !body.file_name) {
    return NextResponse.json(
      { error: "company_id, file_url, and file_name are required." },
      { status: 400 }
    );
  }

  const text = await extractTextFromUrl({
    file_url: body.file_url,
    file_name: body.file_name,
    mime_type: body.mime_type,
  });

  const ingestion = await ingestTextToMemory({
    company_id: body.company_id,
    agent_id: body.agent_id || null,
    title: body.title || body.file_name,
    text,
    source: body.file_url,
  });

  return NextResponse.json({
    extracted_characters: text.length,
    ingestion,
  });
}
