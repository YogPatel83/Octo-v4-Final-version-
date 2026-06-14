import { NextResponse } from "next/server";
import { runComplianceCheck } from "@/lib/enterprise/compliance";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.action_type) {
    return NextResponse.json(
      { error: "company_id and action_type are required." },
      { status: 400 }
    );
  }

  const result = runComplianceCheck({
    company_id: body.company_id,
    action_type: body.action_type,
    region: body.region || "GLOBAL",
  });

  return NextResponse.json({ compliance: result });
}
