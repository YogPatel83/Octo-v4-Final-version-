# Final Backend Tests

Run locally:

npm run build
npm run dev

Open:

/api/health
/api/system/env-check
/api/monitoring/readiness
/api/testing/route-map
/api/testing/backend-smoke

Worker test:

POST /api/worker/ping
Header:
x-octo-worker-secret: your OCTO_WORKER_SECRET

Composio test:

GET /api/composio/action-map

Paddle test:

POST /api/billing/checkout
Requires:
company_id
price_id
customer_email

Memory test:

POST /api/memory/embed
Requires:
company_id
content

RAG test:

POST /api/rag/search
Requires:
company_id
query
