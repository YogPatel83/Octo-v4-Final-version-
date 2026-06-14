import { runOpenAICompletion } from "@/lib/ai/providers/openai";
import { runAnthropicCompletion } from "@/lib/ai/providers/anthropic";
import { runGoogleCompletion } from "@/lib/ai/providers/google";
import { runGrokCompletion } from "@/lib/ai/providers/grok";

type AIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

function messagesToPrompt(messages: AIMessage[]) {
  return messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");
}

export async function callAI(input: {
  provider?: string;
  messages: AIMessage[];
}) {
  const provider = input.provider || "openai";
  const prompt = messagesToPrompt(input.messages);

  if (provider === "anthropic") {
    return runAnthropicCompletion({ prompt });
  }

  if (provider === "google") {
    return runGoogleCompletion({ prompt });
  }

  if (provider === "grok") {
    return runGrokCompletion({ prompt });
  }

  return runOpenAICompletion({ prompt });
}
