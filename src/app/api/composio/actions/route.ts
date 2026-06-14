import { NextResponse } from "next/server";
import { routeComposioAction } from "@/lib/composio/action-router";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.agent_id || !body.tool_name || !body.action) {
    return NextResponse.json(
      { error: "agent_id, tool_name, and action are required." },
      { status: 400 }
    );
  }

  const result = await routeComposioAction({
    agent_id: body.agent_id,
    tool_name: body.tool_name,
    action: body.action,
    payload: body.payload || {},
  });

  return NextResponse.json({ result });
}
