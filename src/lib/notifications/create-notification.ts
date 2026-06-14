import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createNotification(input: {
  company_id: string;
  title: string;
  message: string;
  type?: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      company_id: input.company_id,
      action: input.type || "notification",
      metadata: {
        title: input.title,
        message: input.message,
        ...(input.metadata || {}),
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
