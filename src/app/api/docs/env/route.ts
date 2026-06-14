import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    required_env: [
      "NEXT_PUBLIC_SUPABASE_URL",
      "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      "SUPABASE_SERVICE_ROLE_KEY",
      "NEXT_PUBLIC_APP_URL",
      "OCTO_WORKER_SECRET",
      "OCTO_ENCRYPTION_SECRET",
      "SUPABASE_STORAGE_BUCKET"
    ],
    launch_env: [
      "OPENAI_API_KEY",
      "ANTHROPIC_API_KEY",
      "GOOGLE_GENERATIVE_AI_API_KEY",
      "GROK_API_KEY",
      "COMPOSIO_API_KEY",
      "PADDLE_API_KEY",
      "PADDLE_WEBHOOK_SECRET",
      "NEXT_PUBLIC_PADDLE_CLIENT_TOKEN",
      "NEXT_PUBLIC_PADDLE_ENV"
    ]
  });
}
