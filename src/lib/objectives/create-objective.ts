import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createObjective(input: {
  company_id: string;
  title: string;
  description?: string | null;
  timeframe?: string | null;
  status?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("objectives")
    .insert({
      company_id: input.company_id,
      title: input.title,
      description: input.description || null,
      timeframe: input.timeframe || "90_days",
      status: input.status || "active",
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
