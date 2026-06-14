import { createSupabaseAdmin } from "@/lib/supabase/server";

function hasEnv(key: string) {
  return Boolean(process.env[key] && String(process.env[key]).trim().length > 0);
}

export async function runLaunchChecks() {
  const supabase = createSupabaseAdmin();

  const requiredEnv = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_APP_URL",
    "OCTO_WORKER_SECRET",
    "OCTO_ENCRYPTION_SECRET",
    "SUPABASE_STORAGE_BUCKET"
  ];

  const recommendedEnv = [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GOOGLE_GENERATIVE_AI_API_KEY",
    "GROK_API_KEY",
    "COMPOSIO_API_KEY",
    "PADDLE_API_KEY",
    "PADDLE_WEBHOOK_SECRET",
    "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN",
    "NEXT_PUBLIC_PADDLE_ENV"
  ];

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
    "marketplace_orders",
    "subscriptions",
    "billing_customers",
    "credit_wallets",
    "webhook_events",
    "objectives"
  ];

  const tableResults: Record<string, boolean | string> = {};

  for (const table of tables) {
    const { error } = await supabase
      .from(table)
      .select("*", { head: true, count: "exact" });

    tableResults[table] = error ? error.message : true;
  }

  const missingRequiredEnv = requiredEnv.filter((key) => !hasEnv(key));
  const missingRecommendedEnv = recommendedEnv.filter((key) => !hasEnv(key));
  const brokenTables = Object.entries(tableResults).filter(([, ok]) => ok !== true);

  return {
    ready_for_frontend_integration:
      missingRequiredEnv.length === 0 && brokenTables.length === 0,
    ready_for_paid_launch:
      missingRequiredEnv.length === 0 &&
      missingRecommendedEnv.length === 0 &&
      brokenTables.length === 0,
    env: {
      missing_required: missingRequiredEnv,
      missing_recommended: missingRecommendedEnv,
    },
    database: {
      checked_tables: tables.length,
      broken_tables: brokenTables,
      results: tableResults,
    },
    skipped_batches: [
      "Batch 4L + 4M",
      "Batch 4Z"
    ],
  };
}
