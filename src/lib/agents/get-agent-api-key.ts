import { createSupabaseAdmin } from "@/lib/supabase/server";
import { decryptSecret } from "@/lib/crypto/simple-encryption";

export async function getAgentApiKey(agentId: string, provider: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_model_keys")
    .select("*")
    .eq("agent_id", agentId)
    .eq("provider", provider)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data?.encrypted_key) {
    return null;
  }

  return decryptSecret(data.encrypted_key);
}
