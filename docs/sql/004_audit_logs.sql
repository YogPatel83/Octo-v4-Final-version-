create table if not exists audit_logs (
  id uuid primary key default uuid_generate_v4(),
  company_id uuid references companies(id) on delete cascade,
  actor_id uuid,
  action text not null,
  metadata jsonb default '{}',
  created_at timestamptz default now()
);

create index if not exists audit_logs_company_id_idx on audit_logs(company_id);
create index if not exists audit_logs_action_idx on audit_logs(action);
