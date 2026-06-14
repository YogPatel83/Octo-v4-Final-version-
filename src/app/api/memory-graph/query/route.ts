import { NextResponse } from "next/server";
import { queryMemoryGraph } from "@/lib/memory-graph/query-graph";

export async function POST(req: Request) {
  const body = await req.json();

  const result = await queryMemoryGraph({
    company_id: body.company_id,
    keyword: body.keyword
  });

  return NextResponse.json(result);
}
