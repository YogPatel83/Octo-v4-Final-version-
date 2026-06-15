import { createSupabaseAdmin } from "@/lib/supabase/server";
import { learnFromExecution } from "./execution-learning";
import { rebuildCompanyIntelligenceProfile } from "./profile";

export async function runCompanyIntelligenceCycle(companyId: string) {
  const supabase = createSupabaseAdmin();

  const recentTables = [
    "tasks",
    "approvals",
    "workflows",
    "execution_runs",
    "ai_generations",
    "external_api_requests",
  ];

  const learned = [];

  for (const table of recentTables) {
    const { data } = await supabase
      .from(table)
      .select("*")
      .eq("company_id", companyId)
      .order("updated_at", { ascending: false })
      .limit(20);

    for (const item of data || []) {
      const result = await learnFromExecution({
        company_id: companyId,
        source_table: table,
        source_id: item.id,
      });

      learned.push(result);
    }
  }

  const profile = await rebuildCompanyIntelligenceProfile(companyId);

  return {
    company_id: companyId,
    learned_count: learned.filter((item) => item.learned).length,
    profile,
  };
}
