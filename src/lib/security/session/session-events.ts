import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function recordSessionEvent(input: {
  user_id?: string | null;
  company_id?: string | null;
  event_type: string;
  ip_address?: string | null;
  user_agent?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("user_session_events")
    .insert({
      user_id: input.user_id || null,
      company_id: input.company_id || null,
      event_type: input.event_type,
      ip_address: input.ip_address || null,
      user_agent: input.user_agent || null,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
