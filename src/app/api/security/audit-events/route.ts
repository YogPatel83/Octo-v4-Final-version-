import { NextResponse } from "next/server";
import {
  createAdvancedAuditEvent,
  listAdvancedAuditEvents,
} from "@/lib/security/audit/advanced-audit";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const companyId = url.searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const events = await listAdvancedAuditEvents({
    company_id: companyId,
    event_type: url.searchParams.get("event_type"),
    severity: url.searchParams.get("severity"),
    limit: Number(url.searchParams.get("limit") || 100),
  });

  return NextResponse.json({ events });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.event_type) {
    return NextResponse.json({ error: "event_type is required." }, { status: 400 });
  }

  const event = await createAdvancedAuditEvent({
    company_id: body.company_id || null,
    user_id: body.user_id || null,
    actor_type: body.actor_type || "user",
    event_type: body.event_type,
    entity_type: body.entity_type || null,
    entity_id: body.entity_id || null,
    action: body.action || null,
    severity: body.severity || "info",
    ip_address: body.ip_address || req.headers.get("x-forwarded-for") || null,
    user_agent: body.user_agent || req.headers.get("user-agent") || null,
    before_state: body.before_state || {},
    after_state: body.after_state || {},
    metadata: body.metadata || {},
  });

  return NextResponse.json({ event });
}
