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

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", companyId);

  const { data: tasks } = await supabase
    .from("tasks")
    .select("*")
    .eq("company_id", companyId);

  return NextResponse.json({
    total_agents: agents?.length || 0,
    total_tasks: tasks?.length || 0,
    agents: agents || []
  });
}
