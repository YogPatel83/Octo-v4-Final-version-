import { calculateRoiScore } from "@/lib/roi/score";

export async function analyzeDecision(input: {
  company_id: string;
  title: string;
  description?: string;
  expected_revenue_cents?: number;
  expected_savings_cents?: number;
  estimated_cost_cents?: number;
  risk_level?: "low" | "medium" | "high";
}) {
  const roi = calculateRoiScore({
    expected_revenue_cents: input.expected_revenue_cents,
    expected_savings_cents: input.expected_savings_cents,
    estimated_cost_cents: input.estimated_cost_cents,
    risk_level: input.risk_level || "medium",
  });

  return {
    company_id: input.company_id,
    title: input.title,
    description: input.description || null,
    risk_level: input.risk_level || "medium",
    roi,
    decision:
      roi.recommendation === "strong_go"
        ? "prepare_for_approval"
        : roi.recommendation === "review"
          ? "needs_human_review"
          : "not_recommended",
    approval_required: true,
  };
}
