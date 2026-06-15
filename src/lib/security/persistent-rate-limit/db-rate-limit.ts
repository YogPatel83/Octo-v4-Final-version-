import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function persistentRateLimit(input: {
  key: string;
  limit: number;
  window_ms: number;
  company_id?: string | null;
  user_id?: string | null;
  ip_address?: string | null;
  route?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const now = new Date();
  const resetAt = new Date(now.getTime() + input.window_ms);

  const { data: existing, error: readError } = await supabase
    .from("rate_limit_events")
    .select("*")
    .eq("rate_key", input.key)
    .maybeSingle();

  if (readError) throw new Error(readError.message);

  if (!existing || new Date(existing.reset_at).getTime() < now.getTime()) {
    const { data, error } = await supabase
      .from("rate_limit_events")
      .upsert(
        {
          rate_key: input.key,
          company_id: input.company_id || null,
          user_id: input.user_id || null,
          ip_address: input.ip_address || null,
          route: input.route || null,
          count: 1,
          reset_at: resetAt.toISOString(),
          updated_at: now.toISOString(),
        },
        { onConflict: "rate_key" }
      )
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      allowed: true,
      remaining: input.limit - 1,
      reset_at: data.reset_at,
      event: data,
    };
  }

  if (Number(existing.count || 0) >= input.limit) {
    return {
      allowed: false,
      remaining: 0,
      reset_at: existing.reset_at,
      event: existing,
    };
  }

  const { data, error } = await supabase
    .from("rate_limit_events")
    .update({
      count: Number(existing.count || 0) + 1,
      updated_at: now.toISOString(),
    })
    .eq("id", existing.id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    allowed: true,
    remaining: Math.max(0, input.limit - Number(data.count || 0)),
    reset_at: data.reset_at,
    event: data,
  };
}
