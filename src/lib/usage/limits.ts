import { getPlanLimits } from "@/lib/billing/plans";

export function canUseResource(input: {
  plan: string;
  resource: "agents" | "teams" | "workflows" | "monthly_tasks";
  current_count: number;
}) {
  const limits = getPlanLimits(input.plan);
  const limit = limits[input.resource];

  if (limit === -1) {
    return {
      allowed: true,
      limit,
      current_count: input.current_count,
    };
  }

  return {
    allowed: input.current_count < limit,
    limit,
    current_count: input.current_count,
  };
}
