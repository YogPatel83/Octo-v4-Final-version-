create table if not exists workflow_steps (
  id uuid primary key default uuid_generate_v4(),
  workflow_id uuid references workflows(id) on delete cascade,
  step_order int not null,
  agent_id uuid references agents(id),
  action text not null,
  requires_approval boolean default false,
  created_at timestamptz default now()
);

create index if not exists workflow_steps_workflow_id_idx on workflow_steps(workflow_id);
create index if not exists team_agents_team_id_idx on team_agents(team_id);
create index if not exists team_agents_agent_id_idx on team_agents(agent_id);
