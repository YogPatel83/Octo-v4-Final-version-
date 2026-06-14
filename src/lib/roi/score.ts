export function calculateRoiScore(input: {
  expected_revenue_cents?: number;
  expected_savings_cents?: number;
  estimated_cost_cents?: number;
  risk_level?: "low" | "medium" | "high";
}) {
  const revenue = input.expected_revenue_cents || 0;
  const savings = input.expected_savings_cents || 0;
  const cost = input.estimated_cost_cents || 1;

  const grossReturn = revenue + savings;
  const roi = (grossReturn - cost) / cost;

  const riskPenalty =
    input.risk_level === "high" ? 0.5 :
    input.risk_level === "medium" ? 0.25 :
    0;

  const score = Math.max(0, Math.min(100, Math.round((roi * 50) + 50 - (riskPenalty * 100))));

  return {
    roi,
    score,
    recommendation:
      score >= 75 ? "strong_go" :
      score >= 50 ? "review" :
      "do_not_execute",
  };
}
