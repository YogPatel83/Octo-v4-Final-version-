import { decomposeGoal } from "./decompose-goal";

export function createTaskPlan(input: {
  company_id: string;
  objective: string;
}) {
  const decomposition = decomposeGoal({
    objective: input.objective,
  });

  const tasks = decomposition.phases.map((phase, index) => ({
    company_id: input.company_id,
    title: `${phase.name}: ${input.objective}`,
    input: {
      phase,
      objective: input.objective,
    },
    status: index === 0 ? "queued" : "planned",
    risk_level: phase.name === "Execute" ? "medium" : "low",
  }));

  return {
    company_id: input.company_id,
    objective: input.objective,
    decomposition,
    tasks,
  };
}
