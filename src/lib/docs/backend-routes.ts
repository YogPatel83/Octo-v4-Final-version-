export const BACKEND_ROUTES = {
  auth: [
    "GET /api/auth/session-check",
    "GET /api/profile",
    "POST /api/profile",
    "GET /api/me/companies"
  ],
  builder: [
    "POST /api/builder/generate",
    "POST /api/builder/save-plan-authenticated"
  ],
  core: [
    "GET /api/companies",
    "GET /api/agents",
    "GET /api/teams",
    "GET /api/workflows",
    "GET /api/tasks",
    "GET /api/approvals"
  ],
  execution: [
    "POST /api/autopilot/run",
    "POST /api/swarms/delegate",
    "POST /api/execution-router/run"
  ],
  integrations: [
    "GET /api/composio/action-map",
    "POST /api/composio/execute-mapped"
  ],
  billing: [
    "POST /api/billing/checkout",
    "GET /api/billing/status",
    "POST /api/subscriptions/check-access"
  ],
  launch: [
    "GET /api/launch/final-check",
    "GET /api/launch/blockers"
  ]
};
