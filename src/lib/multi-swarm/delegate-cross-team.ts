import { planSwarms } from "./plan-swarms";

export async function delegateAcrossTeams(input: {
  company_id: string;
  objective: string;
}) {
  const plan = await planSwarms(input);

  const delegations = plan.swarms.map((swarm, index) => ({
    from: index === 0 ? "boardroom" : plan.swarms[index - 1]?.team_name,
    to: swarm.team_name,
    team_id: swarm.team_id,
    responsibility: swarm.assignment,
  }));

  return {
    company_id: input.company_id,
    objective: input.objective,
    delegations,
  };
}
