import { NextResponse } from "next/server";
import { saveCompanyKnowledgeItem } from "@/lib/knowledge/save-knowledge";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.content) {
    return NextResponse.json(
      { error: "company_id and content are required." },
      { status: 400 }
    );
  }

  const item = await saveCompanyKnowledgeItem({
    company_id: body.company_id,
    source_table: body.source_table || null,
    source_id: body.source_id || null,
    knowledge_type: body.knowledge_type || "general",
    title: body.title || null,
    content: body.content,
    confidence: body.confidence || 70,
    tags: body.tags || [],
    metadata: body.metadata || {},
  });

  return NextResponse.json({ item });
}
