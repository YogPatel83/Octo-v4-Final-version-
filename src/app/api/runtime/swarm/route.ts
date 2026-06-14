import { NextResponse } from "next/server";
import { runSwarmRuntime } from "@/lib/runtime-engines/run-swarm-runtime";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.team_id || !body.objective) {
    return NextResponse.json(
      { error: "team_id and objective are required." },
      { status: 400 }
    );
  }

  const result = await runSwarmRuntime({
    team_id: body.team_id,
    objective: body.objective,
    payload: body.payload || {},
  });

  return NextResponse.json({ runtime: result });
}
