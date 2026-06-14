import { AICompletionInput, AICompletionOutput } from "./types";

export async function runMockCompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  const lastUserMessage = [...input.messages].reverse().find((message) => message.role === "user");

  return {
    provider: "mock",
    model: input.model || "octo-mock",
    content: `Mock Octo execution completed. Input: ${lastUserMessage?.content || "No user input provided."}`,
  };
}
