import { runAICompletion } from "@/lib/ai/providers";
import { AIProviderName } from "@/lib/ai/providers/types";
import { getAgentApiKey } from "@/lib/agents/get-agent-api-key";
import { buildRagContext } from "@/lib/rag/build-context";

export async function executeAgent(input: {
  agent: {
    id?: string;
    company_id?: string;
    name: string;
    role: string;
    purpose?: string | null;
    instructions?: string | null;
    model_provider?: string | null;
    model_name?: string | null;
  };
  task: {
    title: string;
    input?: unknown;
  };
}) {
  const provider = (input.agent.model_provider || "mock") as AIProviderName;
  const model = input.agent.model_name || "octo-mock";

  const apiKeyOverride =
    input.agent.id && provider !== "mock"
      ? await getAgentApiKey(input.agent.id, provider)
      : null;

  let memoryContext = "";

  if (input.agent.company_id) {
    try {
      const rag = await buildRagContext({
        company_id: input.agent.company_id,
        agent_id: input.agent.id || null,
        query: input.task.title,
        match_count: 6,
      });

      memoryContext = rag.context;
    } catch {
      memoryContext = "";
    }
  }

  const result = await runAICompletion({
    provider,
    model,
    apiKeyOverride,
    messages: [
      {
        role: "system",
        content: `
You are ${input.agent.name}, an AI worker inside Octo.
Role: ${input.agent.role}
Purpose: ${input.agent.purpose || "Complete assigned company work."}
Instructions: ${input.agent.instructions || "Work carefully and return a clear business result."}

Relevant company memory:
${memoryContext || "No relevant memory found."}
        `.trim(),
      },
      {
        role: "user",
        content: `
Task: ${input.task.title}
Input: ${JSON.stringify(input.task.input || {})}
        `.trim(),
      },
    ],
  });

  return {
    content: result.content,
    provider: result.provider,
    model: result.model,
    used_byok: Boolean(apiKeyOverride),
    used_memory: Boolean(memoryContext),
  };
}
