import { createSupabaseAdmin } from "@/lib/supabase/server";
import { runSwarm } from "@/lib/swarms/run-swarm";
import { runWorkflow } from "@/lib/workflows/run-workflow";
import { executeAgent } from "@/lib/agents/execute-agent";

export async function routeExecution(input: {
  company_id: string;
  objective: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: teams } = await supabase
    .from("teams")
    .select("*")
    .eq("company_id", input.company_id)
    .limit(1);

  if (teams && teams.length > 0) {
    return {
      route: "swarm",
      target_id: teams[0].id,
      reason: "Team available, routing to swarm execution.",
    };
  }

  const { data: workflows } = await supabase
    .from("workflows")
    .select("*")
    .eq("company_id", input.company_id)
    .limit(1);

  if (workflows && workflows.length > 0) {
    return {
      route: "workflow",
      target_id: workflows[0].id,
      reason: "Workflow available, routing to workflow execution.",
    };
  }

  const { data: agents } = await supabase
    .from("agents")
    .select("*")
    .eq("company_id", input.company_id)
    .limit(1);

  if (agents && agents.length > 0) {
    return {
      route: "agent",
      target_id: agents[0].id,
      reason: "Agent available, routing to agent execution.",
    };
  }

  return {
    route: "none",
    target_id: null,
    reason: "No teams, workflows, or agents available.",
  };
}

export async function runRoutedExecution(input: {
  company_id: string;
  objective: string;
}) {
  const route = await routeExecution(input);
  const supabase = createSupabaseAdmin();

  if (route.route === "swarm" && route.target_id) {
    const result = await runSwarm({
      team_id: route.target_id,
      objective: input.objective,
    });

    return {
      route,
      result,
    };
  }

  if (route.route === "workflow" && route.target_id) {
    const result = await runWorkflow({
      workflow_id: route.target_id,
      payload: {
        objective: input.objective,
      },
    });

    return {
      route,
      result,
    };
  }

  if (route.route === "agent" && route.target_id) {
    const { data: agent, error } = await supabase
      .from("agents")
      .select("*")
      .eq("id", route.target_id)
      .single();

    if (error) throw new Error(error.message);

    const result = await executeAgent({
      agent,
      task: {
        title: input.objective,
        input: {
          routed: true,
        },
      },
    });

    return {
      route,
      result,
    };
  }

  return {
    route,
    result: null,
  };
}
