import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { processRuntimeQueue } from "@/lib/runtime/process-queue";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const result = await processRuntimeQueue();

  return NextResponse.json(result);
}
