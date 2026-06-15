import { NextResponse } from "next/server";
import { learnFromDataset } from "@/lib/knowledge/learn-dataset";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.source_table || !body.source_id) {
    return NextResponse.json(
      { error: "company_id, source_table, and source_id are required." },
      { status: 400 }
    );
  }

  const result = await learnFromDataset({
    company_id: body.company_id,
    source_table: body.source_table,
    source_id: body.source_id,
    text: body.text || null,
    objective: body.objective || null,
  });

  return NextResponse.json(result);
}
