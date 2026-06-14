import Anthropic from "@anthropic-ai/sdk";
import { AICompletionInput, AICompletionOutput } from "./types";

export async function runAnthropicCompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  const apiKey = input.apiKeyOverride || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return {
      provider: "anthropic",
      model: input.model,
      content: "Anthropic key is missing. Add a platform key or agent BYOK key.",
    };
  }

  const client = new Anthropic({ apiKey });

  const system = input.messages.find((message) => message.role === "system")?.content || "";
  const userMessages = input.messages
    .filter((message) => message.role !== "system")
    .map((message) => ({
      role: message.role === "assistant" ? "assistant" as const : "user" as const,
      content: message.content,
    }));

  const response = await client.messages.create({
    model: input.model,
    max_tokens: 1200,
    system,
    messages: userMessages,
  });

  const text = response.content
    .map((block) => ("text" in block ? block.text : ""))
    .join("");

  return {
    provider: "anthropic",
    model: input.model,
    content: text,
    raw: response,
  };
}
