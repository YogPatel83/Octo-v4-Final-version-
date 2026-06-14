create table if not exists agent_model_keys (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents(id) on delete cascade,
  provider text not null,
  encrypted_key text not null,
  created_at timestamptz default now()
);

create table if not exists agent_tools (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents(id) on delete cascade,
  tool_name text not null,
  config jsonb default '{}',
  status text default 'not_connected',
  created_at timestamptz default now()
);

create table if not exists agent_knowledge_files (
  id uuid primary key default uuid_generate_v4(),
  agent_id uuid references agents(id) on delete cascade,
  file_name text not null,
  file_url text not null,
  file_type text,
  status text default 'uploaded',
  created_at timestamptz default now()
);

create index if not exists agent_model_keys_agent_id_idx on agent_model_keys(agent_id);
create index if not exists agent_tools_agent_id_idx on agent_tools(agent_id);
create index if not exists agent_knowledge_files_agent_id_idx on agent_knowledge_files(agent_id);
