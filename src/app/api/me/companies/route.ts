import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const user = await requireAuth(req);
  const supabase = createSupabaseAdmin();

  const { data: ownedCompanies, error: ownedError } = await supabase
    .from("companies")
    .select("*")
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false });

  if (ownedError) {
    return NextResponse.json({ error: ownedError.message }, { status: 500 });
  }

  const { data: memberships, error: memberError } = await supabase
    .from("company_members")
    .select("company_id, role")
    .eq("user_id", user.id);

  if (memberError) {
    return NextResponse.json({ error: memberError.message }, { status: 500 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    owned_companies: ownedCompanies || [],
    memberships: memberships || [],
  });
}
