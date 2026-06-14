export type AIProviderName = "openai" | "anthropic" | "google" | "grok" | "mock";

export type AIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type AICompletionInput = {
  provider: AIProviderName;
  model: string;
  messages: AIMessage[];
  apiKeyOverride?: string | null;
};

export type AICompletionOutput = {
  provider: AIProviderName;
  model: string;
  content: string;
  raw?: unknown;
};
