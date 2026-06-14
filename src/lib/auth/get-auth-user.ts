import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getAuthUserFromRequest(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader?.startsWith("Bearer ")) {
    return {
      user: null,
      error: "Missing bearer token.",
    };
  }

  const token = authHeader.replace("Bearer ", "").trim();
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase.auth.getUser(token);

  if (error || !data.user) {
    return {
      user: null,
      error: error?.message || "Invalid token.",
    };
  }

  return {
    user: data.user,
    error: null,
  };
}
