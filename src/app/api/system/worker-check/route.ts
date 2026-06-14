import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ ok: false, error: "Unauthorized worker." }, { status: 401 });
  }

  return NextResponse.json({
    ok: true,
    worker: "authorized",
    checked_at: new Date().toISOString(),
  });
}
