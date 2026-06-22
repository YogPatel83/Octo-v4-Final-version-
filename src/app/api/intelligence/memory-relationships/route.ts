import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { buildMemoryRelationships } from "@/lib/intelligence-expansion/memory/build-relationships";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("memory_relationships")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(200);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ relationships: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await buildMemoryRelationships(body.company_id);

  return NextResponse.json(result);
}
