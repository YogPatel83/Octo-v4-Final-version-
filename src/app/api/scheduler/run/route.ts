import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { runScheduledJobs } from "@/lib/scheduler/run-scheduled-jobs";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const result = await runScheduledJobs();

  return NextResponse.json(result);
}
