import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function runFinalLaunchCheck() {
  const supabase = createSupabaseAdmin();

  const tables = [
    "companies",
    "agents",
    "teams",
    "workflows",
    "tasks",
    "approvals",
    "subscriptions",
    "memory_entries"
  ];

  const results: Record<string, boolean> = {};

  for (const table of tables) {
    const { error } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true });

    results[table] = !error;
  }

  const env = {
    supabase: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    service_key: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    openai: Boolean(process.env.OPENAI_API_KEY),
    composio: Boolean(process.env.COMPOSIO_API_KEY),
    paddle: Boolean(process.env.PADDLE_API_KEY),
    worker_secret: Boolean(process.env.OCTO_WORKER_SECRET)
  };

  const blockers = [];

  if (!env.supabase) blockers.push("Missing Supabase URL");
  if (!env.service_key) blockers.push("Missing Supabase service role key");
  if (!env.worker_secret) blockers.push("Missing worker secret");

  for (const [table, ok] of Object.entries(results)) {
    if (!ok) blockers.push(`Broken table: ${table}`);
  }

  return {
    ready: blockers.length === 0,
    env,
    database: results,
    blockers
  };
}
