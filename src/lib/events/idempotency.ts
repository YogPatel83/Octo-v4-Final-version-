import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function checkEventIdempotency(input: {
  provider: string;
  event_id: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("webhook_events")
    .select("*")
    .eq("provider", input.provider)
    .eq("event_id", input.event_id)
    .maybeSingle();

  return {
    already_processed: Boolean(data),
    event: data || null,
  };
}

export async function recordWebhookEvent(input: {
  provider: string;
  event_id: string;
  event_type: string;
  payload: Record<string, unknown>;
  status?: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("webhook_events")
    .insert({
      provider: input.provider,
      event_id: input.event_id,
      event_type: input.event_type,
      payload: input.payload,
      status: input.status || "processed",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
