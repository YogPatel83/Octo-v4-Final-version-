import { NextResponse } from "next/server";
import { ingestTextToMemory } from "@/lib/rag/ingest-text";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.text) {
    return NextResponse.json(
      { error: "company_id and text are required." },
      { status: 400 }
    );
  }

  const result = await ingestTextToMemory({
    company_id: body.company_id,
    agent_id: body.agent_id || null,
    title: body.title || "Uploaded knowledge",
    text: body.text,
    source: body.source || null,
  });

  return NextResponse.json({ ingestion: result });
}
