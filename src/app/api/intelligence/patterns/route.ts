import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { discoverCompanyPatterns } from "@/lib/intelligence-expansion/pattern-engine";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("company_learning_patterns")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ patterns: data || [] });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const result = await discoverCompanyPatterns(body.company_id);

  return NextResponse.json(result);
}
