export const OCTO_PLANS = {
  free: {
    name: "Free",
    trial_days: 0,

    companies: 1,
    agents: 1,
    teams: 0,

    workflows: 1,
    monthly_tasks: 25,

    monthly_credits: 100,

    byok_required: false,
    byok_allowed: false,

    marketplace_selling: false,
    autopilot: false,
  },

  pro: {
    name: "Pro",
    trial_days: 0,

    companies: 5,
    agents: 15,
    teams: 5,

    workflows: 25,
    monthly_tasks: 1500,

    monthly_credits: 2500,

    byok_required: false,
    byok_allowed: true,

    marketplace_selling: false,
    autopilot: false,
  },

  max: {
    name: "Max",
    trial_days: 0,

    companies: 15,
    agents: 75,
    teams: 20,

    workflows: 150,
    monthly_tasks: 10000,

    monthly_credits: 15000,

    byok_required: false,
    byok_allowed: true,

    marketplace_selling: true,
    autopilot: true,
  },

  enterprise: {
    name: "Enterprise",
    trial_days: 0,

    companies: -1,
    agents: -1,
    teams: -1,

    workflows: -1,
    monthly_tasks: -1,

    monthly_credits: -1,

    byok_required: false,
    byok_allowed: true,

    marketplace_selling: true,
    autopilot: true,
  },
} as const;
export type OctoPlan = keyof typeof OCTO_PLANS;

export function getPlanLimits(plan: string) {
  return OCTO_PLANS[(plan as OctoPlan) || "free"] || OCTO_PLANS.free;
}
