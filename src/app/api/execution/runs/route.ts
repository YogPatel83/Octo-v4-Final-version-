import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");
  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("execution_runs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(100);

  if (companyId) query = query.eq("company_id", companyId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ runs: data || [] });
}
