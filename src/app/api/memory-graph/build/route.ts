import { NextResponse } from "next/server";
import { buildMemoryGraph } from "@/lib/memory-graph/build-graph";

export async function POST(req: Request) {
  const body = await req.json();

  const graph = await buildMemoryGraph(body.company_id);

  return NextResponse.json(graph);
}
