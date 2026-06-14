import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAutonomousCompanyPlan } from "./create-plan";
import { executeAgent } from "@/lib/agents/execute-agent";
import { writeMemory } from "@/lib/memory/write-memory";

export async function runAutonomousCompany(input: {
  company_id: string;
  objective: string;
}) {
  const supabase = createSupabaseAdmin();

  const plan = await createAutonomousCompanyPlan({
    company_id: input.company_id,
    objective: input.objective,
  });

  const hierarchy = plan.delegation_tree.hierarchy;
  const executionResults = [];

  const leader = hierarchy.ceo || hierarchy.managers[0] || hierarchy.workers[0];

  if (!leader) {
    return {
      plan,
      status: "no_agents_available",
      message: "Create agents before running autonomous company execution.",
    };
  }

  const leaderResult = await executeAgent({
    agent: leader,
    task: {
      title: input.objective,
      input: {
        mode: "autonomous_company_leader",
        plan,
      },
    },
  });

  executionResults.push({
    agent_id: leader.id,
    role: leader.role,
    result: leaderResult,
  });

  for (const worker of hierarchy.workers.slice(0, 5)) {
    const result = await executeAgent({
      agent: worker,
      task: {
        title: `Support objective: ${input.objective}`,
        input: {
          leader_result: leaderResult,
          plan,
        },
      },
    });

    executionResults.push({
      agent_id: worker.id,
      role: worker.role,
      result,
    });
  }

  await writeMemory({
    company_id: input.company_id,
    title: `Autonomous run: ${input.objective}`,
    content: JSON.stringify({
      objective: input.objective,
      executionResults,
    }),
    metadata: {
      type: "autonomous_company_run",
    },
  });

  return {
    status: "completed",
    plan,
    execution_results: executionResults,
  };
}
