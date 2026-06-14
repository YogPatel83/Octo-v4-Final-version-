import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ subscriptions: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("subscriptions")
    .insert({
      company_id: body.company_id,
      plan: body.plan || "free",
      status: body.status || "trial",
      trial_ends_at: body.trial_ends_at || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ subscription: data });
}
