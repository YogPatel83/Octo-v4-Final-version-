import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId =
    new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json(
      { error: "company_id is required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data: objectives } = await supabase
    .from("objectives")
    .select("*")
    .eq("company_id", companyId);

  const { count: taskCount } = await supabase
    .from("tasks")
    .select("*", { count: "exact", head: true })
    .eq("company_id", companyId);

  return NextResponse.json({
    company_id: companyId,
    objectives: objectives || [],
    total_tasks: taskCount || 0,
    autopilot_enabled: true,
  });
}
