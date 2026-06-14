import { NextResponse } from "next/server";
import { generateAgentLearningProfile } from "@/lib/learning/agent-learning";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.agent_id) {
    return NextResponse.json(
      { error: "agent_id required" },
      { status: 400 }
    );
  }

  const profile =
    await generateAgentLearningProfile(
      body.agent_id
    );

  return NextResponse.json({
    profile,
  });
}
