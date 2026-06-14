import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const tables = ["ai_generations", "external_api_requests", "tasks"] as const;
  const status: Record<string, Record<string, number>> = {};

  for (const table of tables) {
    status[table] = {};

    for (const state of ["queued", "running", "completed", "failed", "missing_api_key"]) {
      const { count } = await supabase
        .from(table)
        .select("*", { count: "exact", head: true })
        .eq("status", state);

      status[table][state] = count || 0;
    }
  }

  return NextResponse.json({ status });
}
