import { OCTO_PLANS, getPlanLimits, type OctoPlan } from "@/lib/billing/plans";

export const OCTO_PRICING = [
  {
    key: "free",
    price_cents: 0,
    monthly_price: "$0",
    ...OCTO_PLANS.free,
  },
  {
    key: "pro",
    price_cents: 4900,
    monthly_price: "$49",
    ...OCTO_PLANS.pro,
  },
  {
    key: "max",
    price_cents: 19900,
    monthly_price: "$199",
    ...OCTO_PLANS.max,
  },
  {
    key: "enterprise",
    price_cents: 500000,
    monthly_price: "Custom",
    ...OCTO_PLANS.enterprise,
  },
] as const;

export { OCTO_PLANS, getPlanLimits };
export type { OctoPlan };

export function estimatePlanMargin(input: {
  price_cents: number;
  estimated_ai_cost_cents: number;
}) {
  const gross = input.price_cents - input.estimated_ai_cost_cents;
  const margin = input.price_cents === 0 ? 0 : gross / input.price_cents;

  return {
    gross_profit_cents: gross,
    margin_percent: Math.round(margin * 100),
    profitable: gross > 0,
  };
}
