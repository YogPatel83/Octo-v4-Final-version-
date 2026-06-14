import { NextResponse } from "next/server";
import { forwardExecutionToSelfHosted } from "@/lib/self-hosted/forward-execution";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.execution_type) {
    return NextResponse.json(
      { error: "company_id and execution_type are required." },
      { status: 400 }
    );
  }

  const result = await forwardExecutionToSelfHosted({
    company_id: body.company_id,
    execution_type: body.execution_type,
    payload: body.payload || {},
  });

  return NextResponse.json(result, { status: result.forwarded ? 200 : 400 });
}
