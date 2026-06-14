import { NextResponse } from "next/server";
import { searchMemory } from "@/lib/memory/search-memory";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.query) {
    return NextResponse.json(
      { error: "company_id and query are required." },
      { status: 400 }
    );
  }

  const results = await searchMemory({
    company_id: body.company_id,
    agent_id: body.agent_id || null,
    query: body.query,
    match_count: body.match_count || 10,
  });

  return NextResponse.json({ results });
}
