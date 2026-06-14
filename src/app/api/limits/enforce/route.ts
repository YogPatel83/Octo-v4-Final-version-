import { NextResponse } from "next/server";
import { enforcePlanLimit } from "@/lib/limits/enforce-plan-limits";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.resource) {
    return NextResponse.json(
      { error: "company_id and resource are required." },
      { status: 400 }
    );
  }

  const result = await enforcePlanLimit({
    company_id: body.company_id,
    resource: body.resource,
  });

  return NextResponse.json(result, { status: result.allowed ? 200 : 402 });
}
