import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createUniversalConnector(input: {
  company_id: string;
  name: string;
  connector_type?: string;
  auth_type?: string;
  base_url?: string | null;
  config?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("universal_connectors")
    .insert({
      company_id: input.company_id,
      name: input.name,
      connector_type: input.connector_type || "custom",
      auth_type: input.auth_type || "api_key",
      base_url: input.base_url || null,
      status: "active",
      config: input.config || {},
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listUniversalConnectors(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("universal_connectors")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);
  return data || [];
}
