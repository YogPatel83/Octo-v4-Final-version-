import { runMockCompletion } from "./mock";
import { runOpenAICompletion } from "./openai";
import { runAnthropicCompletion } from "./anthropic";
import { runGoogleCompletion } from "./google";
import { runGrokCompletion } from "./grok";
import { AICompletionInput, AICompletionOutput } from "./types";

export async function runAICompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  if (input.provider === "mock") {
    return runMockCompletion(input);
  }

  if (input.provider === "openai") {
    return runOpenAICompletion(input);
  }

  if (input.provider === "anthropic") {
    return runAnthropicCompletion(input);
  }

  if (input.provider === "google") {
    return runGoogleCompletion(input);
  }

  if (input.provider === "grok") {
    return runGrokCompletion(input);
  }

  return {
    provider: "mock",
    model: "octo-mock",
    content: "Unsupported provider. Used mock fallback.",
  };
}
