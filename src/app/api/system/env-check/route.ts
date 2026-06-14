import { NextResponse } from "next/server";

function present(value: string | undefined) {
  return Boolean(value && value.trim().length > 0);
}

export async function GET() {
  const checks = {
    NEXT_PUBLIC_SUPABASE_URL: present(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: present(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    SUPABASE_SERVICE_ROLE_KEY: present(process.env.SUPABASE_SERVICE_ROLE_KEY),
    NEXT_PUBLIC_APP_URL: present(process.env.NEXT_PUBLIC_APP_URL),
    OPENAI_API_KEY: present(process.env.OPENAI_API_KEY),
    ANTHROPIC_API_KEY: present(process.env.ANTHROPIC_API_KEY),
    GOOGLE_GENERATIVE_AI_API_KEY: present(process.env.GOOGLE_GENERATIVE_AI_API_KEY),
    GROK_API_KEY: present(process.env.GROK_API_KEY),
    COMPOSIO_API_KEY: present(process.env.COMPOSIO_API_KEY),
    PADDLE_API_KEY: present(process.env.PADDLE_API_KEY),
    PADDLE_WEBHOOK_SECRET: present(process.env.PADDLE_WEBHOOK_SECRET),
    OCTO_WORKER_SECRET: present(process.env.OCTO_WORKER_SECRET),
    SUPABASE_STORAGE_BUCKET: present(process.env.SUPABASE_STORAGE_BUCKET),
  };

  const missing = Object.entries(checks)
    .filter(([, ok]) => !ok)
    .map(([key]) => key);

  return NextResponse.json({
    ok: missing.length === 0,
    checks,
    missing,
  });
}
