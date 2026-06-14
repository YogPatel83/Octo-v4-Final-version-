import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { REQUIRED_OCTO_TABLES } from "@/lib/testing/database-tables";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const results: Record<string, string | true> = {};

  for (const table of REQUIRED_OCTO_TABLES) {
    const { error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    results[table] = error ? error.message : true;
  }

  const missingOrBroken = Object.entries(results)
    .filter(([, value]) => value !== true)
    .map(([table, error]) => ({ table, error }));

  return NextResponse.json({
    ok: missingOrBroken.length === 0,
    checked_tables: REQUIRED_OCTO_TABLES.length,
    missing_or_broken: missingOrBroken,
    results,
  });
}
