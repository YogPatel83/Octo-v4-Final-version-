export function evaluateExecutionPolicy(input: {
  action_type: string;
  amount_cents?: number;
  risk_level?: string;
}) {
  const reasons: string[] = [];

  if (input.amount_cents && input.amount_cents > 0) {
    reasons.push("money_involved");
  }

  if (["contract", "legal", "supplier_commitment", "external_payment"].includes(input.action_type)) {
    reasons.push(input.action_type);
  }

  if (input.risk_level === "high") {
    reasons.push("high_risk");
  }

  return {
    allowed_without_approval: reasons.length === 0,
    requires_approval: reasons.length > 0,
    reasons,
  };
}
