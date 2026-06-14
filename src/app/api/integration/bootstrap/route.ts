import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const user = await requireAuth(req);
  const supabase = createSupabaseAdmin();

  await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
  });

  const { data: companies } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    profile_ready: true,
    companies: companies || [],
    has_company: Boolean(companies && companies.length > 0),
  });
}
