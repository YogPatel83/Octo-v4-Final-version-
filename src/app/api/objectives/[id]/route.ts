import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase.from("objectives").select("*").eq("id", id).single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ objective: data });
}

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("objectives")
    .update({
      title: body.title,
      description: body.description,
      timeframe: body.timeframe,
      status: body.status,
      metadata: body.metadata,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ objective: data });
}
