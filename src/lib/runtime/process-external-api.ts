import { createSupabaseAdmin } from "@/lib/supabase/server";
import { updateRuntimeItem } from "./update-status";

export async function processExternalApiRequest(id: string) {
  const supabase = createSupabaseAdmin();

  const { data: item, error } = await supabase
    .from("external_api_requests")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  await updateRuntimeItem({
    table: "external_api_requests",
    id,
    status: "running",
    output: {
      started_at: new Date().toISOString(),
    },
  });

  const response = {
    completed_at: new Date().toISOString(),
    category: item.category,
    provider: item.provider,
    action: item.action,
    payload: item.payload,
    message: "External API worker completed structure-level execution. Real provider adapter can replace this response.",
  };

  return updateRuntimeItem({
    table: "external_api_requests",
    id,
    status: "completed",
    output: response,
  });
}
