import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function requestDeploymentRollback(input: {
  company_id: string;
  build_project_id?: string | null;
  deployment_id?: string | null;
  rollback_to_deployment_id?: string | null;
  reason?: string | null;
  requested_by_user_id?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_rollbacks")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      deployment_id: input.deployment_id || null,
      rollback_to_deployment_id: input.rollback_to_deployment_id || null,
      status: "approval_required",
      reason: input.reason || null,
      requested_by_user_id: input.requested_by_user_id || null,
      response: {
        note: "Rollback request created. Human approval required before rollback execution.",
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    user_id: input.requested_by_user_id || null,
    actor_type: "user",
    event_type: "deployment_rollback_requested",
    entity_type: "build_rollbacks",
    entity_id: data.id,
    action: "request_rollback",
    severity: "high",
    metadata: {
      deployment_id: input.deployment_id || null,
      rollback_to_deployment_id: input.rollback_to_deployment_id || null,
    },
  });

  return data;
}
