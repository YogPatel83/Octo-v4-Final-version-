import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function rollbackAgentVersion(versionId: string) {
  const supabase = createSupabaseAdmin();

  const { data: version, error: versionError } = await supabase
    .from("agent_versions")
    .select("*")
    .eq("id", versionId)
    .single();

  if (versionError) throw new Error(versionError.message);

  const snapshot = version.snapshot || {};

  const { data, error } = await supabase
    .from("agents")
    .update({
      name: snapshot.name,
      role: snapshot.role,
      purpose: snapshot.purpose,
      instructions: snapshot.instructions,
      model_provider: snapshot.model_provider,
      model_name: snapshot.model_name,
      status: snapshot.status || "idle",
    })
    .eq("id", version.agent_id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function rollbackSkillVersion(versionId: string) {
  const supabase = createSupabaseAdmin();

  const { data: version, error: versionError } = await supabase
    .from("skill_versions")
    .select("*")
    .eq("id", versionId)
    .single();

  if (versionError) throw new Error(versionError.message);

  const snapshot = version.snapshot || {};

  const { data, error } = await supabase
    .from("skills")
    .update({
      name: snapshot.name,
      description: snapshot.description,
      file_url: snapshot.file_url,
    })
    .eq("id", version.skill_id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
