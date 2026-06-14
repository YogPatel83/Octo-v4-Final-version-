import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { retryFailedRuntimeItems } from "@/lib/runtime/retry-failed";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const result = await retryFailedRuntimeItems();

  return NextResponse.json({ retried: result });
}
