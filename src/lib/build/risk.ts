export function classifyBuildAction(action: string) {
  const safe = [
    "plan_app",
    "generate_files",
    "generate_branding",
    "generate_schema",
    "create_preview",
  ];

  const approvalRequired = [
    "push_to_github",
    "apply_supabase_schema",
    "deploy_to_vercel",
    "connect_domain",
    "publish_production",
  ];

  if (safe.includes(action)) {
    return {
      action,
      risk: "low",
      requires_approval: false,
    };
  }

  if (approvalRequired.includes(action)) {
    return {
      action,
      risk: "high",
      requires_approval: true,
    };
  }

  return {
    action,
    risk: "medium",
    requires_approval: true,
  };
}
