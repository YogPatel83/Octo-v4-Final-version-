import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { BACKEND_ROUTE_MAP } from "@/lib/testing/route-map";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const checks: Record<string, unknown> = {
    routes_registered: BACKEND_ROUTE_MAP.length,
    required_tables: {},
  };

  const tables = [
    "profiles",
    "companies",
    "agents",
    "teams",
    "workflows",
    "tasks",
    "approvals",
    "memory_entries",
    "memory_vectors",
    "marketplace_items",
    "marketplace_orders",
    "subscriptions",
    "billing_customers",
    "credit_wallets",
    "audit_logs",
    "execution_events",
    "webhook_events",
    "objectives"
  ];

  for (const table of tables) {
    const { error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    (checks.required_tables as Record<string, boolean | string>)[table] =
      error ? error.message : true;
  }

  return NextResponse.json({
    ok: true,
    checks,
  });
}
