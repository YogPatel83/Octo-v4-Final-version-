import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getUserProfile(userId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return null;
  }

  return data;
}
