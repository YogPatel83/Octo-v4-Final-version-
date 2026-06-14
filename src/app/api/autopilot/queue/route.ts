import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId =
    new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json(
      { error: "company_id required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("tasks")
    .select("*")
    .eq("company_id", companyId)
    .eq("status", "queued")
    .order("created_at", { ascending: true });

  return NextResponse.json({
    queued_tasks: data || [],
  });
}
