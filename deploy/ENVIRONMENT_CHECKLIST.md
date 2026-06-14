# Octo Environment Checklist

## Codespaces / Local
- .env.local exists
- Supabase URL added
- Supabase anon key added
- Supabase service role key added
- OPENAI_API_KEY added for embeddings and OpenAI
- OCTO_WORKER_SECRET added

## Vercel
- Add all production env vars
- Set NEXT_PUBLIC_APP_URL to Vercel URL
- Confirm /api/system/env-check

## DigitalOcean Worker
- Add NEXT_PUBLIC_APP_URL
- Add OCTO_WORKER_SECRET
- Start worker with PM2
- Test /api/system/worker-check
