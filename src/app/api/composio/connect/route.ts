import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  return NextResponse.json({
    status: "placeholder",
    message: "Composio connect URL will be generated after Composio app/action setup.",
    agent_id: body.agent_id,
    tool_name: body.tool_name,
  });
}
