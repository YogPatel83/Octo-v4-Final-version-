import { NextResponse } from "next/server";
import { writeMemory } from "@/lib/memory/write-memory";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.content) {
    return NextResponse.json(
      { error: "company_id and content are required." },
      { status: 400 }
    );
  }

  const memory = await writeMemory({
    company_id: body.company_id,
    agent_id: body.agent_id || null,
    title: body.title || null,
    content: body.content,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ memory });
}
