import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createSecurityEvent(input: {
  company_id?: string | null;
  user_id?: string | null;
  event_type: string;
  severity?: "low" | "medium" | "high" | "critical";
  ip_address?: string | null;
  user_agent?: string | null;
  message?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("security_events")
    .insert({
      company_id: input.company_id || null,
      user_id: input.user_id || null,
      event_type: input.event_type,
      severity: input.severity || "medium",
      ip_address: input.ip_address || null,
      user_agent: input.user_agent || null,
      message: input.message || null,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
