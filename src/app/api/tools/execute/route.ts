import { NextResponse } from "next/server";
import { executeToolAction } from "@/lib/tools/execute-tool";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.tool_name || !body.action) {
    return NextResponse.json(
      { error: "tool_name and action are required." },
      { status: 400 }
    );
  }

  const result = await executeToolAction({
    tool_name: body.tool_name,
    action: body.action,
    payload: body.payload || {},
  });

  return NextResponse.json({ result });
}
