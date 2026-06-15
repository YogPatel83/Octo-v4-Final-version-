import { runOpenAICompletion } from "@/lib/ai/providers/openai";
import { runAnthropicCompletion } from "@/lib/ai/providers/anthropic";
import { runGoogleCompletion } from "@/lib/ai/providers/google";
import { runGrokCompletion } from "@/lib/ai/providers/grok";

type AIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function getDefaultModel(provider: string) {
  if (provider === "anthropic") return "claude-sonnet-4-5";
  if (provider === "google") return "gemini-2.5-flash";
  if (provider === "grok") return "grok-4";
  return "gpt-4.1-mini";
}

export async function callAI(input: {
  provider?: string;
  model?: string;
  apiKeyOverride?: string;
  messages: AIMessage[];
}) {
  const provider = input.provider || "openai";

  const payload = {
    model: input.model || getDefaultModel(provider),
    messages: input.messages,
    apiKeyOverride: input.apiKeyOverride,
  };

  if (provider === "anthropic") {
    return runAnthropicCompletion(payload);
  }

  if (provider === "google") {
    return runGoogleCompletion(payload);
  }

  if (provider === "grok") {
    return runGrokCompletion(payload);
  }

  return runOpenAICompletion(payload);
}
