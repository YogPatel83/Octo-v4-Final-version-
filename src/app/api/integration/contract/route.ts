import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    app: "Octo",
    frontend_owner: "Google Stitch",
    backend_owner: "Octo API",
    auth: {
      type: "Supabase Auth",
      header: "Authorization: Bearer <supabase_access_token>",
    },
    core_routes: {
      profile: "/api/profile",
      my_companies: "/api/me/companies",
      builder_generate: "/api/builder/generate",
      builder_save_authenticated: "/api/builder/save-plan-authenticated",
      companies: "/api/companies",
      agents: "/api/agents",
      teams: "/api/teams",
      workflows: "/api/workflows",
      tasks: "/api/tasks",
      approvals: "/api/approvals",
      memory: "/api/memory",
      rag_context: "/api/rag/context",
      composio_execute: "/api/composio/execute-mapped",
      billing_status: "/api/billing/status",
    },
    frontend_pages_expected: [
      "Landing",
      "Login",
      "Signup",
      "Dashboard",
      "Companies",
      "Agents",
      "AI Teams",
      "Builder",
      "Workflows",
      "Approvals",
      "Datasets",
      "Skills",
      "Marketplace",
      "Billing",
      "Pricing",
      "Settings",
      "Support",
      "Legal pages"
    ],
  });
}
