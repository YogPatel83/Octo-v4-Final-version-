import { NextResponse } from "next/server";
import { runSwarm } from "@/lib/swarms/run-swarm";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  if (!body.objective) {
    return NextResponse.json({ error: "objective is required." }, { status: 400 });
  }

  const result = await runSwarm({
    team_id: id,
    objective: body.objective,
  });

  return NextResponse.json({ swarm: result });
}
