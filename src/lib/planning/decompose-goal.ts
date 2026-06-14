export function decomposeGoal(input: {
  objective: string;
}) {
  const objective = input.objective;

  return {
    objective,
    phases: [
      {
        name: "Understand",
        description: "Clarify the goal, constraints, business context, and required outcomes.",
      },
      {
        name: "Plan",
        description: "Create agents, teams, workflows, tools, and approval rules.",
      },
      {
        name: "Execute",
        description: "Assign work to the right agents and teams.",
      },
      {
        name: "Review",
        description: "Collect outputs, check risk, and request approvals if needed.",
      },
      {
        name: "Remember",
        description: "Store useful outcomes into long-term company memory.",
      },
    ],
    suggested_agents: [
      "Strategy Agent",
      "Operations Agent",
      "Finance Agent",
      "Marketing Agent",
      "Supplier Agent",
      "Customer Support Agent",
    ],
    approval_rules: [
      "Spending money requires approval",
      "Legal decisions require approval",
      "Contracts require approval",
      "Supplier commitments require approval",
      "Final business decisions require approval",
    ],
  };
}
