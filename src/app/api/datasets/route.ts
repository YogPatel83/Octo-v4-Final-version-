import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("datasets")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ datasets: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("datasets")
    .insert({
      company_id: body.company_id,
      name: body.name,
      file_url: body.file_url || null,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ dataset: data });
}
