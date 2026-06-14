import { createSupabaseAdmin } from "@/lib/supabase/server";
import { generateOctoPlan } from "./generate-octo-plan";

export async function saveOctoPlan(input: {
  owner_id: string;
  objective: string;
  company_name?: string;
  industry?: string;
}) {
  const supabase = createSupabaseAdmin();
  const plan = generateOctoPlan(input);

  const { data: company, error: companyError } = await supabase
    .from("companies")
    .insert({
      owner_id: input.owner_id,
      name: plan.company.name,
      industry: plan.company.industry,
      objective: plan.company.objective,
    })
    .select()
    .single();

  if (companyError) throw new Error(companyError.message);

  await supabase.from("company_members").insert({
    company_id: company.id,
    user_id: input.owner_id,
    role: "owner",
  });

  const createdAgents = [];

  for (const agent of plan.agents) {
    const { data, error } = await supabase
      .from("agents")
      .insert({
        company_id: company.id,
        ...agent,
        status: "idle",
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    createdAgents.push(data);
  }

  const ceo = createdAgents.find((agent) => agent.role === "CEO") || createdAgents[0];

  const createdTeams = [];

  for (const team of plan.teams) {
    const { data, error } = await supabase
      .from("teams")
      .insert({
        company_id: company.id,
        name: team.name,
        goal: team.goal,
        leader_agent_id: ceo?.id || null,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    createdTeams.push(data);

    for (const agent of createdAgents) {
      await supabase.from("team_agents").insert({
        team_id: data.id,
        agent_id: agent.id,
        role: agent.role,
      });
    }
  }

  const createdWorkflows = [];

  for (const workflow of plan.workflows) {
    const { data: workflowData, error: workflowError } = await supabase
      .from("workflows")
      .insert({
        company_id: company.id,
        name: workflow.name,
        trigger_type: workflow.trigger_type,
        status: "active",
      })
      .select()
      .single();

    if (workflowError) throw new Error(workflowError.message);

    createdWorkflows.push(workflowData);

    for (const step of workflow.steps) {
      await supabase.from("workflow_steps").insert({
        workflow_id: workflowData.id,
        step_order: step.step_order,
        agent_id: ceo?.id || null,
        action: step.action,
        requires_approval: step.requires_approval,
      });
    }
  }

  for (const approval of plan.approvals) {
    await supabase.from("approvals").insert({
      company_id: company.id,
      title: `Default approval rule: ${approval}`,
      description: `Octo must request human approval for ${approval}.`,
      approval_type: approval,
      status: "policy",
    });
  }

  return {
    plan,
    created: {
      company,
      agents: createdAgents,
      teams: createdTeams,
      workflows: createdWorkflows,
    },
  };
}
