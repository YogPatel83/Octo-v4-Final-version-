import { createSupabaseAdmin } from "@/lib/supabase/server";
import { encryptSecret, decryptSecret } from "@/lib/crypto/simple-encryption";
import { maskSecret } from "@/lib/crypto/mask";

export async function saveExternalApiKey(input: {
  company_id: string;
  category: string;
  provider: string;
  api_key: string;
  base_url?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("external_api_keys")
    .upsert({
      company_id: input.company_id,
      category: input.category,
      provider: input.provider,
      encrypted_key: encryptSecret(input.api_key),
      base_url: input.base_url || null,
      metadata: input.metadata || {}
    }, { onConflict: "company_id,category,provider" })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    ...data,
    encrypted_key: maskSecret(data.encrypted_key)
  };
}

export async function getExternalApiKey(companyId: string, category: string, provider: string) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("external_api_keys")
    .select("*")
    .eq("company_id", companyId)
    .eq("category", category)
    .eq("provider", provider)
    .maybeSingle();

  if (!data?.encrypted_key) return null;

  return {
    api_key: decryptSecret(data.encrypted_key),
    base_url: data.base_url || null,
    metadata: data.metadata || {}
  };
}
