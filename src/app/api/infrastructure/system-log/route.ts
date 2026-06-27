import { NextResponse } from "next/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function POST(req: Request) {
  const body = await req.json();

  const event = await createAdvancedAuditEvent({
    company_id: body.company_id || null,
    user_id: body.user_id || null,
    actor_type: body.actor_type || "system",
    event_type: body.event_type || "system_log",
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
