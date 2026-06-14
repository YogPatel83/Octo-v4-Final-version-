import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createAgentVersion(input: {
  agent_id: string;
  version_label?: string;
  snapshot: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_versions")
    .insert({
      agent_id: input.agent_id,
      version_label: input.version_label || "manual_version",
      snapshot: input.snapshot,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function createSkillVersion(input: {
  skill_id: string;
  version_label?: string;
  snapshot: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("skill_versions")
    .insert({
      skill_id: input.skill_id,
      version_label: input.version_label || "manual_version",
      snapshot: input.snapshot,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
