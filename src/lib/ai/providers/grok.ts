import OpenAI from "openai";
import { AICompletionInput, AICompletionOutput } from "./types";

export async function runGrokCompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  const apiKey = input.apiKeyOverride || process.env.GROK_API_KEY;

  if (!apiKey) {
    return {
      provider: "grok",
      model: input.model,
      content: "Grok key is missing. Add a platform key or agent BYOK key.",
    };
  }

  const client = new OpenAI({
    apiKey,
    baseURL: "https://api.x.ai/v1",
  });

  const response = await client.chat.completions.create({
    model: input.model,
    messages: input.messages,
  });

  return {
    provider: "grok",
    model: input.model,
    content: response.choices[0]?.message?.content || "",
    raw: response,
  };
}
