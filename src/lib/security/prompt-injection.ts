const DANGEROUS_PATTERNS = [
  "ignore previous instructions",
  "ignore all previous instructions",
  "reveal your system prompt",
  "show hidden instructions",
  "print api keys",
  "show api keys",
  "leak secrets",
  "bypass approval",
  "disable approval",
  "send without approval",
  "exfiltrate",
  "steal credentials",
  "give me the service role key",
  "supabase_service_role_key",
  "octo_worker_secret",
  "paddle_api_key",
];

export function scanPromptForInjection(input: string) {
  const text = input.toLowerCase();

  const matches = DANGEROUS_PATTERNS.filter((pattern) => text.includes(pattern));

  return {
    safe: matches.length === 0,
    severity: matches.length > 0 ? "high" : "low",
    matches,
    message:
      matches.length > 0
        ? "Potential prompt injection or credential theft attempt detected."
        : "No obvious prompt injection detected.",
  };
}
