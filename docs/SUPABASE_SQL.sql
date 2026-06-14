create extension if not exists "uuid-ossp";

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now()
);

create table if not exists companies (
  id uuid primary key default uuid_generate_v4(),
  owner_id uuid references profiles(id) on delete cascade,
  name text not null,
  industry text,
  objective text,
  created_at timestamptz default now()
);

create table if not exists company_members (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  role text default 'owner',
  created_at timestamptz default now()
);

create table if not exists agents (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  role text not null,
  purpose text,
  instructions text,
  model_provider text,
  model_name text,
  status text default 'idle',
  created_at timestamptz default now()
);

create table if not exists teams (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  goal text,
  leader_agent_id uuid references agents(id),
  created_at timestamptz default now()
);

create table if not exists team_agents (
  id uuid primary key default uuid_generate_v4(),
  team_id uuid references teams(id) on delete cascade,
  agent_id uuid references agents(id) on delete cascade,
  role text,
  created_at timestamptz default now()
);

create table if not exists workflows (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  trigger_type text,
  status text default 'draft',
  created_at timestamptz default now()
);

create table if not exists approvals (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  task_id uuid,
  title text not null,
  description text,
  approval_type text not null,
  status text default 'pending',
  created_at timestamptz default now(),
  decided_at timestamptz
);

create table if not exists tasks (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  agent_id uuid references agents(id),
  workflow_id uuid references workflows(id),
  title text not null,
  input jsonb default '{}',
  output jsonb default '{}',
  status text default 'queued',
  risk_level text default 'low',
  created_at timestamptz default now()
);

create table if not exists datasets (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  file_url text,
  created_at timestamptz default now()
);

create table if not exists skills (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  name text not null,
  description text,
  file_url text,
  created_at timestamptz default now()
);

create table if not exists marketplace_items (
  id uuid primary key default uuid_generate_v4(),
  seller_company_id uuid references companies(id) on delete cascade,
  item_type text not null,
  title text not null,
  description text,
  price_cents int default 0,
  status text default 'draft',
  created_at timestamptz default now()
);

create table if not exists subscriptions (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  plan text default 'free',
  status text default 'trial',
  trial_ends_at timestamptz,
  created_at timestamptz default now()
);
