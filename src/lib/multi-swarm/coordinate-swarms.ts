import { runSwarm } from "@/lib/swarms/run-swarm";
import { planSwarms } from "./plan-swarms";

export async function coordinateSwarms(input: {
  company_id: string;
  objective: string;
}) {
  const plan = await planSwarms(input);
  const results = [];

  for (const swarm of plan.swarms) {
    const result = await runSwarm({
      team_id: swarm.team_id,
      objective: swarm.assignment,
    });

    results.push({
      swarm,
      result,
    });
  }

  return {
    plan,
    results,
  };
}
