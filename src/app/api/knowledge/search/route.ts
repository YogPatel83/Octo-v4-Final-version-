import { NextResponse } from "next/server";
import { searchCompanyKnowledge } from "@/lib/knowledge/search-knowledge";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const items = await searchCompanyKnowledge({
    company_id: companyId,
    query: url.searchParams.get("query"),
    knowledge_type: url.searchParams.get("knowledge_type"),
    limit: Number(url.searchParams.get("limit") || 50),
  });

  return NextResponse.json({ items });
}
