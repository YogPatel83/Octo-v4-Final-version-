import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createAuditLog(input: {
  company_id: string;
  actor_id?: string | null;
  action: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      company_id: input.company_id,
      actor_id: input.actor_id || null,
      action: input.action,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) {
    console.error("Audit log failed:", error.message);
    return null;
  }

  return data;
}
