import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

const SNAPSHOT_TABLES = [
  "companies",
  "company_members",
  "agents",
  "teams",
  "team_agents",
  "workflows",
  "workflow_steps",
  "tasks",
  "approvals",
  "objectives",
  "memory_entries",
  "company_knowledge_items",
  "company_decision_memory",
  "company_learning_patterns",
  "generated_skills",
  "model_api_keys",
  "external_api_keys",
  "private_deployment_settings",
];

export async function createCompanyBackup(input: {
  company_id: string;
  created_by_user_id?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const snapshot: Record<string, unknown> = {};

  for (const table of SNAPSHOT_TABLES) {
    const column = table === "companies" ? "id" : "company_id";

    const { data, error } = await supabase
      .from(table)
      .select("*")
      .eq(column, input.company_id);

    snapshot[table] = error ? { error: error.message } : data || [];
  }

  const { data: backup, error: backupError } = await supabase
    .from("backup_recovery_points")
    .insert({
      company_id: input.company_id,
      backup_type: "company_snapshot",
      status: "created",
      snapshot,
      created_by_user_id: input.created_by_user_id || null,
    })
    .select()
    .single();

  if (backupError) throw new Error(backupError.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    user_id: input.created_by_user_id || null,
    actor_type: "system",
    event_type: "backup_created",
    entity_type: "backup_recovery_points",
    entity_id: backup.id,
    action: "create_backup",
    severity: "info",
    metadata: {
      tables: SNAPSHOT_TABLES,
    },
  });

  return backup;
}

export async function listCompanyBackups(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("backup_recovery_points")
    .select("id, company_id, backup_type, status, restore_notes, created_by_user_id, created_at, restored_at")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}

export async function restoreCompanyBackup(input: {
  backup_id: string;
  restored_by_user_id?: string | null;
  restore_notes?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data: backup, error } = await supabase
    .from("backup_recovery_points")
    .select("*")
    .eq("id", input.backup_id)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (!backup) {
    return {
      restored: false,
      reason: "Backup not found.",
    };
  }

  await supabase
    .from("backup_recovery_points")
    .update({
      status: "restore_requested",
      restore_notes: input.restore_notes || null,
      restored_at: new Date().toISOString(),
    })
    .eq("id", input.backup_id);

  await createAdvancedAuditEvent({
    company_id: backup.company_id,
    user_id: input.restored_by_user_id || null,
    actor_type: "system",
    event_type: "backup_restore_requested",
    entity_type: "backup_recovery_points",
    entity_id: input.backup_id,
    action: "request_restore",
    severity: "high",
    metadata: {
      restore_notes: input.restore_notes || null,
      safety_note:
        "Restore is marked requested. Full destructive restore should be manually confirmed before applying.",
    },
  });

  return {
    restored: false,
    restore_requested: true,
    backup_id: input.backup_id,
    message:
      "Restore request recorded. Destructive restore should require manual confirmation before applying.",
  };
}
