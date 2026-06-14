import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("sops")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ sops: data });
}

export async function POST(req: Request) {
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  if (!body.company_id || !body.name) {
    return NextResponse.json({ error: "company_id and name are required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("sops")
    .insert({
      company_id: body.company_id,
      name: body.name,
      description: body.description || null,
      steps: body.steps || [],
      status: body.status || "draft",
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ sop: data });
}
