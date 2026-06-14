import OpenAI from "openai";
import { AICompletionInput, AICompletionOutput } from "./types";

export async function runOpenAICompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  const apiKey = input.apiKeyOverride || process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      provider: "openai",
      model: input.model,
      content: "OpenAI key is missing. Add a platform key or agent BYOK key.",
    };
  }

  const client = new OpenAI({ apiKey });

  const response = await client.chat.completions.create({
    model: input.model,
    messages: input.messages,
  });

  return {
    provider: "openai",
    model: input.model,
    content: response.choices[0]?.message?.content || "",
    raw: response,
  };
}
