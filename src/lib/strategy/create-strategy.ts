export function createStrategy(input: {
  company_id: string;
  objective: string;
  timeframe?: string;
}) {
  return {
    company_id: input.company_id,
    objective: input.objective,
    timeframe: input.timeframe || "30_days",
    strategic_plan: [
      {
        phase: "Diagnosis",
        outcome: "Understand current company state, resources, constraints, and risks.",
      },
      {
        phase: "Design",
        outcome: "Choose agents, teams, workflows, tools, budget, and approval rules.",
      },
      {
        phase: "Execution",
        outcome: "Run tasks through agents, swarms, and workflows.",
      },
      {
        phase: "Review",
        outcome: "Measure outcomes, ROI, failures, and bottlenecks.",
      },
      {
        phase: "Scale",
        outcome: "Create repeatable systems, SOPs, and higher-capacity swarms.",
      },
    ],
    risk_controls: [
      "Human approval for money",
      "Human approval for contracts",
      "Human approval for legal decisions",
      "Human approval for supplier commitments",
      "Human approval for final business decisions",
    ],
  };
}
