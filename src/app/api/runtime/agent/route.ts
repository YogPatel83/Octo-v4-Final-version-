import { NextResponse } from "next/server";
import { runAgentRuntime } from "@/lib/runtime-engines/run-agent";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.agent_id || !body.title) {
    return NextResponse.json(
      { error: "agent_id and title are required." },
      { status: 400 }
    );
  }

  const result = await runAgentRuntime({
    agent_id: body.agent_id,
    title: body.title,
    payload: body.payload || {},
  });

  return NextResponse.json({ runtime: result });
}
