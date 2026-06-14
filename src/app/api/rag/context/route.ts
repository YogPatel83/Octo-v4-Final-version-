import { NextResponse } from "next/server";
import { buildRagContext } from "@/lib/rag/build-context";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.query) {
    return NextResponse.json(
      { error: "company_id and query are required." },
      { status: 400 }
    );
  }

  const result = await buildRagContext({
    company_id: body.company_id,
    agent_id: body.agent_id || null,
    query: body.query,
    match_count: body.match_count || 8,
  });

  return NextResponse.json({ rag_context: result });
}
