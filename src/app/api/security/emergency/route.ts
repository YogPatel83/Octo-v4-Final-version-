import { NextResponse } from "next/server";
import {
  getEmergencyControls,
  setEmergencyControls,
} from "@/lib/security/emergency-controls";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const controls = await getEmergencyControls(companyId);

  return NextResponse.json({ controls });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const controls = await setEmergencyControls({
    company_id: body.company_id,
    executions_paused: body.executions_paused || false,
    outbound_paused: body.outbound_paused || false,
    billing_paused: body.billing_paused || false,
    marketplace_paused: body.marketplace_paused || false,
    reason: body.reason || null,
  });

  return NextResponse.json({ controls });
}
