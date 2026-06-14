import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function saveGeneration(input: {
  company_id: string;
  user_id?: string | null;
  type: string;
  provider: string;
  model: string;
  prompt?: string | null;
  input_url?: string | null;
  output_url?: string | null;
  output_text?: string | null;
  status?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("ai_generations")
    .insert({
      company_id: input.company_id,
      user_id: input.user_id || null,
      type: input.type,
      provider: input.provider,
      model: input.model,
      prompt: input.prompt || null,
      input_url: input.input_url || null,
      output_url: input.output_url || null,
      output_text: input.output_text || null,
      status: input.status || "queued",
      metadata: input.metadata || {}
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
