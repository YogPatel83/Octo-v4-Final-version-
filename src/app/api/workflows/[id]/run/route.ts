import { NextResponse } from "next/server";
import { runWorkflow } from "@/lib/workflows/run-workflow";

export async function POST(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const body = await req.json();

  const result = await runWorkflow({
    workflow_id: id,
    payload: body.payload || {},
  });

  return NextResponse.json({ workflow_run: result });
}
