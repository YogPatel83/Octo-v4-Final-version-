import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const body = await req.json();

  return NextResponse.json({
    ok: true,
    received: true,
    execution_type: body.execution_type,
    company_id: body.company_id,
    payload: body.payload || {},
    message: "Self-hosted worker received execution payload. Attach local execution logic here.",
  });
}
