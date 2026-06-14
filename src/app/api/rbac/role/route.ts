import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function PATCH(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.user_id || !body.role) {
    return NextResponse.json(
      { error: "company_id, user_id, and role are required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("company_members")
    .upsert({
      company_id: body.company_id,
      user_id: body.user_id,
      role: body.role,
    }, { onConflict: "company_id,user_id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ member: data });
}
