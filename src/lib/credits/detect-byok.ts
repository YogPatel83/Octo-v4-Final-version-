import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getCompanyModelKey } from "@/lib/models/model-keys";
import { getAgentApiKey } from "@/lib/agents/get-agent-api-key";

export async function detectByokForExecution(input: {
  company_id: string;
  source_table: string;
  source_id: string;
  provider?: string | null;
  input?: Record<string, any>;
}) {
  const supabase = createSupabaseAdmin();

  if (input.source_table === "ai_generations") {
    const provider = input.provider || input.input?.provider || "openai";
    const key = await getCompanyModelKey(input.company_id, provider);

    return {
      byok_used: Boolean(key?.api_key),
      reason: key?.api_key ? "company_model_key_found" : "no_company_model_key",
      provider,
    };
  }

  if (input.source_table === "external_api_requests") {
    return {
      byok_used: true,
      reason: "external_api_requests_use_customer_connected_keys",
      provider: input.provider || input.input?.provider || null,
    };
  }

  if (input.source_table === "tasks") {
    const { data: task } = await supabase
      .from("tasks")
      .select("*")
      .eq("id", input.source_id)
      .maybeSingle();

    const agentId =
      task?.assigned_agent_id ||
      task?.agent_id ||
      input.input?.assigned_agent_id ||
      input.input?.agent_id ||
      null;

    if (!agentId) {
      return {
        byok_used: false,
        reason: "task_has_no_agent",
        provider: input.provider || null,
      };
    }

    const { data: agent } = await supabase
      .from("agents")
      .select("*")
      .eq("id", agentId)
      .maybeSingle();

    const provider =
      agent?.model_provider ||
      input.provider ||
      "openai";

    const agentKey = await getAgentApiKey(agentId, provider);

    if (agentKey) {
      return {
        byok_used: true,
        reason: "agent_specific_model_key_found",
        provider,
        agent_id: agentId,
      };
    }

    const companyKey = await getCompanyModelKey(input.company_id, provider);

    return {
      byok_used: Boolean(companyKey?.api_key),
      reason: companyKey?.api_key
        ? "company_model_key_found_for_agent_provider"
        : "no_agent_or_company_model_key",
      provider,
      agent_id: agentId,
    };
  }

  return {
    byok_used: false,
    reason: "unknown_source_table",
    provider: input.provider || null,
  };
}
