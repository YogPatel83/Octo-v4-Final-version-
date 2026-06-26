import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function markSupabaseSchemaApplied(input: {
  company_id: string;
  schema_generation_id: string;
  applied_by_user_id?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_schema_generations")
    .update({
      status: "applied",
      applied_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.schema_generation_id)
    .eq("company_id", input.company_id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    user_id: input.applied_by_user_id || null,
    actor_type: "user",
    event_type: "supabase_schema_marked_applied",
    entity_type: "build_schema_generations",
    entity_id: input.schema_generation_id,
    action: "mark_schema_applied",
    severity: "high",
    metadata: {
      human_approval_required: true,
    },
  });

  return data;
}
