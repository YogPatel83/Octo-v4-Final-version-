import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function updateRuntimeItem(input: {
  table: "ai_generations" | "external_api_requests" | "tasks";
  id: string;
  status: string;
  output?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const patch: Record<string, unknown> = {
    status: input.status,
    updated_at: new Date().toISOString(),
  };

  if (input.table === "ai_generations") {
    patch.metadata = input.output || {};
  }

  if (input.table === "external_api_requests") {
    patch.response = input.output || {};
  }

  if (input.table === "tasks") {
    patch.output = input.output || {};
  }

  const { data, error } = await supabase
    .from(input.table)
    .update(patch)
    .eq("id", input.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
