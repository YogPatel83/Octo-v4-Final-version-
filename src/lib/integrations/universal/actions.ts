import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createUniversalConnectorAction(input: {
  company_id: string;
  connector_id: string;
  name: string;
  method?: string;
  path: string;
  headers?: Record<string, unknown>;
  body_template?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("universal_connector_actions")
    .insert({
      company_id: input.company_id,
      connector_id: input.connector_id,
      name: input.name,
      method: input.method || "POST",
      path: input.path,
      headers: input.headers || {},
      body_template: input.body_template || {},
      status: "active",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function listUniversalConnectorActions(input: {
  company_id: string;
  connector_id?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("universal_connector_actions")
    .select("*")
    .eq("company_id", input.company_id)
    .order("created_at", { ascending: false });

  if (input.connector_id) query = query.eq("connector_id", input.connector_id);

  const { data, error } = await query;

  if (error) throw new Error(error.message);
  return data || [];
}
