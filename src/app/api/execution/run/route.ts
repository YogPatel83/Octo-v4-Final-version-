import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { processNextExecutionRun } from "@/lib/execution/process-next";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const result = await processNextExecutionRun();

  return NextResponse.json(result);
}
