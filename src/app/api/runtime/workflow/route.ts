import { NextResponse } from "next/server";
import { runWorkflowRuntime } from "@/lib/runtime-engines/run-workflow-runtime";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.workflow_id) {
    return NextResponse.json(
      { error: "workflow_id is required." },
      { status: 400 }
    );
  }

  const result = await runWorkflowRuntime({
    workflow_id: body.workflow_id,
    payload: body.payload || {},
  });

  return NextResponse.json({ runtime: result });
}
