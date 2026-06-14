import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getExternalApiKey } from "./keys";

export async function createExternalApiRequest(input: {
  company_id: string;
  category: string;
  provider: string;
  action: string;
  payload?: Record<string, unknown>;
}) {
  const key = await getExternalApiKey(input.company_id, input.category, input.provider);
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("external_api_requests")
    .insert({
      company_id: input.company_id,
      category: input.category,
      provider: input.provider,
      action: input.action,
      payload: input.payload || {},
      status: key ? "queued" : "missing_api_key",
      response: {
        byok_available: Boolean(key),
        base_url: key?.base_url || null,
        note: key
          ? "Request queued. Provider-specific worker execution can process this."
          : "Missing BYOK key for this provider."
      }
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
