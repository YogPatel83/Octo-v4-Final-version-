import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth/require-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const user = await requireAuth(req);
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const [
    company,
    agents,
    teams,
    workflows,
    tasks,
    approvals,
    subscription
  ] = await Promise.all([
    supabase.from("companies").select("*").eq("id", companyId).single(),
    supabase.from("agents").select("*").eq("company_id", companyId),
    supabase.from("teams").select("*").eq("company_id", companyId),
    supabase.from("workflows").select("*").eq("company_id", companyId),
    supabase.from("tasks").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(20),
    supabase.from("approvals").select("*").eq("company_id", companyId).order("created_at", { ascending: false }).limit(20),
    supabase.from("subscriptions").select("*").eq("company_id", companyId).maybeSingle(),
  ]);

  if (company.error) {
    return NextResponse.json({ error: company.error.message }, { status: 500 });
  }

  return NextResponse.json({
    user: {
      id: user.id,
      email: user.email,
    },
    company: company.data,
    agents: agents.data || [],
    teams: teams.data || [],
    workflows: workflows.data || [],
    recent_tasks: tasks.data || [],
    approvals: approvals.data || [],
    subscription: subscription.data || null,
  });
}
