import { buildAgentHierarchy } from "./build-hierarchy";

export async function createDelegationTree(input: {
  company_id: string;
  objective: string;
}) {
  const hierarchy = await buildAgentHierarchy(input.company_id);

  const delegation = [];

  if (hierarchy.ceo) {
    delegation.push({
      from_agent_id: hierarchy.ceo.id,
      to: hierarchy.managers.length > 0
        ? hierarchy.managers.map((agent) => agent.id)
        : hierarchy.workers.map((agent) => agent.id),
      responsibility: "Break objective into business priorities.",
    });
  }

  for (const manager of hierarchy.managers) {
    delegation.push({
      from_agent_id: manager.id,
      to: hierarchy.workers.map((agent) => agent.id),
      responsibility: `Coordinate workers for ${manager.role}.`,
    });
  }

  return {
    company_id: input.company_id,
    objective: input.objective,
    hierarchy,
    delegation,
  };
}
