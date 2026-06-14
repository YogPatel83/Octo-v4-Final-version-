import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function buildAgentHierarchy(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: agents, error } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", companyId);

  if (error) throw new Error(error.message);

  const ceo =
    agents?.find((agent) => agent.role?.toLowerCase().includes("ceo")) ||
    agents?.find((agent) => agent.role?.toLowerCase().includes("leader")) ||
    null;

  const managers =
    agents?.filter((agent) =>
      ["manager", "head", "lead", "director"].some((word) =>
        agent.role?.toLowerCase().includes(word)
      )
    ) || [];

  const workers =
    agents?.filter((agent) =>
      agent.id !== ceo?.id && !managers.some((manager) => manager.id === agent.id)
    ) || [];

  return {
    company_id: companyId,
    ceo,
    managers,
    workers,
    chain_of_command: {
      ceo_agent_id: ceo?.id || null,
      manager_agent_ids: managers.map((agent) => agent.id),
      worker_agent_ids: workers.map((agent) => agent.id),
    },
  };
}
