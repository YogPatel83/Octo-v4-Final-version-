import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createAdvancedAuditEvent(input: {
  company_id?: string | null;
  user_id?: string | null;
  actor_type?: "user" | "agent" | "system" | "worker";
  event_type: string;
  entity_type?: string | null;
  entity_id?: string | null;
  action?: string | null;
  severity?: "info" | "low" | "medium" | "high" | "critical";
  ip_address?: string | null;
  user_agent?: string | null;
  before_state?: Record<string, unknown>;
  after_state?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("advanced_audit_events")
    .insert({
      company_id: input.company_id || null,
      user_id: input.user_id || null,
      actor_type: input.actor_type || "user",
      event_type: input.event_type,
      entity_type: input.entity_type || null,
      entity_id: input.entity_id || null,
      action: input.action || null,
      severity: input.severity || "info",
      ip_address: input.ip_address || null,
      user_agent: input.user_agent || null,
      before_state: input.before_state || {},
      after_state: input.after_state || {},
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listAdvancedAuditEvents(input: {
  company_id: string;
  event_type?: string | null;
  severity?: string | null;
  limit?: number;
}) {
  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("advanced_audit_events")
    .select("*")
    .eq("company_id", input.company_id)
    .order("created_at", { ascending: false })
    .limit(input.limit || 100);

  if (input.event_type) query = query.eq("event_type", input.event_type);
  if (input.severity) query = query.eq("severity", input.severity);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data || [];
}
