import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createMediaRequest(input: {
  company_id: string;
  user_id?: string | null;
  type: "image" | "video";
  provider: string;
  model: string;
  prompt: string;
  status?: string;
  output_url?: string | null;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("media_requests")
    .insert({
      company_id: input.company_id,
      user_id: input.user_id || null,
      type: input.type,
      provider: input.provider,
      model: input.model,
      prompt: input.prompt,
      status: input.status || "queued",
      output_url: input.output_url || null,
      metadata: input.metadata || {}
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
