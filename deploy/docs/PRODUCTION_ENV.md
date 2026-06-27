# Octo Production Environment Checklist

## Vercel Environment Variables

Required:

NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
SUPABASE_DB_URL=

OCTO_WORKER_SECRET=

OPENAI_API_KEY=
ANTHROPIC_API_KEY=
GOOGLE_GENERATIVE_AI_API_KEY=
GROK_API_KEY=

COMPOSIO_API_KEY=

PADDLE_API_KEY=
PADDLE_WEBHOOK_SECRET=
NEXT_PUBLIC_PADDLE_CLIENT_TOKEN=
NEXT_PUBLIC_PADDLE_ENV=production

VERCEL_TOKEN=
GITHUB_TOKEN=

SUPABASE_STORAGE_BUCKET=octo-files

Optional:

DIGITALOCEAN_WORKER_URL=
HIGGSFIELD_API_URL=
ELEVENLABS_API_KEY=
STABILITY_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=

## DigitalOcean Worker Environment

Create:

/opt/octo/.env.production

Required:

NEXT_PUBLIC_APP_URL=https://your-vercel-domain.com
OCTO_WORKER_SECRET=same_secret_as_vercel
OCTO_WORKER_PORT=8080
OCTO_WORKER_INTERVAL_MS=15000
SUPABASE_DB_URL=postgresql://...

## Security Rules

Never commit `.env.production`.

Never expose service role key in browser.

Never expose user API keys in browser.

Use Vercel env variables only.

Use DigitalOcean env file only.

Use Paddle live keys only after sandbox works.
