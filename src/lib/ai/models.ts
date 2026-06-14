export const SUPPORTED_MODELS = [
  {
    provider: "mock",
    models: ["octo-mock"],
  },
  {
    provider: "openai",
    models: ["gpt-4.1", "gpt-4.1-mini", "gpt-4o"],
  },
  {
    provider: "anthropic",
    models: ["claude-sonnet-4-5", "claude-haiku-4-5", "claude-3-5-sonnet-latest"],
  },
  {
    provider: "google",
    models: ["gemini-1.5-pro", "gemini-1.5-flash"],
  },
  {
    provider: "grok",
    models: ["grok-2", "grok-2-mini"],
  },
];

export function isSupportedProvider(provider: string) {
  return SUPPORTED_MODELS.some((item) => item.provider === provider);
}
