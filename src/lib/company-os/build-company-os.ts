import { createWorkforce } from "@/lib/workforce/create-workforce";

export async function buildCompanyOS(input: {
  company_id: string;
  objective: string;
}) {
  const workforce = createWorkforce({
    company_id: input.company_id,
    objective: input.objective,
  });

  return {
    company_id: input.company_id,
    objective: input.objective,
    operating_system: {
      workforce,
      systems: [
        "Agents",
        "Teams",
        "Workflows",
        "Approvals",
        "Memory",
        "Boardroom",
        "Marketplace",
        "Billing",
        "Autonomous Execution"
      ]
    }
  };
}
