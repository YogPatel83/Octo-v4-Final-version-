export function generateOctoPlan(input: {
  objective: string;
  company_name?: string;
  industry?: string;
}) {
  return {
    company: {
      name: input.company_name || "New Octo Company",
      industry: input.industry || "General Business",
      objective: input.objective,
    },
    agents: [
      {
        name: "CEO Agent",
        role: "CEO",
        purpose: "Own the company objective and delegate work.",
        instructions: "Think strategically, delegate clearly, and request approval for risky decisions.",
        model_provider: "mock",
        model_name: "octo-mock",
      },
      {
        name: "Operations Agent",
        role: "Operations Manager",
        purpose: "Handle daily operations, workflows, suppliers, and execution.",
        instructions: "Keep operations organized and report bottlenecks.",
        model_provider: "mock",
        model_name: "octo-mock",
      },
      {
        name: "Finance Agent",
        role: "Finance Manager",
        purpose: "Track budgets, ROI, spending, and financial approvals.",
        instructions: "Never approve spending without human approval.",
        model_provider: "mock",
        model_name: "octo-mock",
      },
      {
        name: "Growth Agent",
        role: "Marketing Manager",
        purpose: "Plan marketing, content, ads, and growth campaigns.",
        instructions: "Draft campaigns and request approval before publishing or spending.",
        model_provider: "mock",
        model_name: "octo-mock",
      },
    ],
    teams: [
      {
        name: "Executive Swarm",
        goal: "Make company-level decisions and route work to the right agents.",
      },
      {
        name: "Growth Swarm",
        goal: "Drive marketing, sales, and customer acquisition.",
      },
      {
        name: "Operations Swarm",
        goal: "Run daily business operations and execution.",
      },
    ],
    workflows: [
      {
        name: "Daily Company Review",
        trigger_type: "daily",
        steps: [
          {
            step_order: 1,
            action: "Review company status and open tasks.",
            requires_approval: false,
          },
          {
            step_order: 2,
            action: "Prepare risky decisions for approval.",
            requires_approval: true,
          },
        ],
      },
      {
        name: "Growth Campaign Workflow",
        trigger_type: "manual",
        steps: [
          {
            step_order: 1,
            action: "Prepare campaign plan.",
            requires_approval: false,
          },
          {
            step_order: 2,
            action: "Request approval before spending or publishing.",
            requires_approval: true,
          },
        ],
      },
    ],
    approvals: [
      "spending_money",
      "signing_contract",
      "legal_decision",
      "supplier_commitment",
      "final_business_decision",
    ],
  };
}
