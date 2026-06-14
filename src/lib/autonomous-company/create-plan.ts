import { createDelegationTree } from "@/lib/hierarchy/delegation-tree";

export async function createAutonomousCompanyPlan(input: {
  company_id: string;
  objective: string;
}) {
  const tree = await createDelegationTree({
    company_id: input.company_id,
    objective: input.objective,
  });

  return {
    company_id: input.company_id,
    objective: input.objective,
    operating_mode: "autonomous_with_human_approval",
    delegation_tree: tree,
    execution_plan: [
      "Understand the business objective",
      "Route objective through CEO or leader agent",
      "Delegate work to manager agents",
      "Assign execution tasks to worker agents",
      "Collect results",
      "Create approval requests for risky actions",
      "Write important outcomes into memory",
      "Return executive summary",
    ],
    approval_rules: [
      "Money spending requires approval",
      "Contracts require approval",
      "Legal decisions require approval",
      "Supplier commitments require approval",
      "Final business decisions require approval",
    ],
  };
}
