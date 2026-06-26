import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createOAuthConnectionRequest(input: {
  company_id: string;
  provider: string;
  connection_name?: string | null;
  scopes?: string[];
  auth_url?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("oauth_connection_requests")
    .insert({
      company_id: input.company_id,
      provider: input.provider,
      connection_name: input.connection_name || input.provider,
      status: "requested",
      auth_url: input.auth_url || null,
      scopes: input.scopes || [],
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listOAuthConnectionRequests(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("oauth_connection_requests")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
