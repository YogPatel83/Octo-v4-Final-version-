import { NextResponse } from "next/server";
import { runSop } from "@/lib/sops/run-sop";

export async function POST(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();

  const result = await runSop({
    sop_id: id,
    payload: body.payload || {},
  });

  return NextResponse.json({ sop_run: result });
}
