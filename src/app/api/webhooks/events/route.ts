import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const provider = new URL(req.url).searchParams.get("provider");
  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("webhook_events")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (provider) {
    query = query.eq("provider", provider);
  }

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ events: data });
}
