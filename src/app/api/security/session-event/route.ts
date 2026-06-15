import { NextResponse } from "next/server";
import { recordSessionEvent } from "@/lib/security/session/session-events";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.event_type) {
    return NextResponse.json({ error: "event_type is required." }, { status: 400 });
  }

  const event = await recordSessionEvent({
    user_id: body.user_id || null,
    company_id: body.company_id || null,
    event_type: body.event_type,
    ip_address: body.ip_address || req.headers.get("x-forwarded-for") || null,
    user_agent: body.user_agent || req.headers.get("user-agent") || null,
    metadata: body.metadata || {},
  });

  return NextResponse.json({ event });
}
