export function createRecoveryPlan(input: {
  failure_type: string;
  failed_resource_type?: string;
  failed_resource_id?: string;
  error_message?: string;
}) {
  const actions = [
    "Log failure",
    "Pause risky actions",
    "Check latest task state",
    "Retry safe step if possible",
    "Request human approval if money, legal, supplier, or contract is involved",
  ];

  if (input.failure_type.includes("api")) {
    actions.push("Check API key and provider status");
  }

  if (input.failure_type.includes("tool")) {
    actions.push("Reconnect tool integration");
  }

  if (input.failure_type.includes("payment")) {
    actions.push("Stop paid execution and request billing review");
  }

  return {
    failure_type: input.failure_type,
    failed_resource_type: input.failed_resource_type || null,
    failed_resource_id: input.failed_resource_id || null,
    error_message: input.error_message || null,
    recommended_actions: actions,
    requires_human_review: true,
  };
}
