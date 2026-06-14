export function getRuntimeReadiness() {
  const required = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "NEXT_PUBLIC_APP_URL",
    "OCTO_WORKER_SECRET",
  ];

  const optional = [
    "OPENAI_API_KEY",
    "ANTHROPIC_API_KEY",
    "GOOGLE_GENERATIVE_AI_API_KEY",
    "GROK_API_KEY",
    "COMPOSIO_API_KEY",
    "PADDLE_API_KEY",
    "PADDLE_WEBHOOK_SECRET",
  ];

  const missing_required = required.filter((key) => !process.env[key]);
  const missing_optional = optional.filter((key) => !process.env[key]);

  return {
    ready: missing_required.length === 0,
    missing_required,
    missing_optional,
  };
}
