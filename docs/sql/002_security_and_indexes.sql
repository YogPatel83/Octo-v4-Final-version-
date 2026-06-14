create index if not exists companies_owner_id_idx on companies(owner_id);
create index if not exists company_members_company_id_idx on company_members(company_id);
create index if not exists company_members_user_id_idx on company_members(user_id);
create index if not exists agents_company_id_idx on agents(company_id);
create index if not exists teams_company_id_idx on teams(company_id);
create index if not exists workflows_company_id_idx on workflows(company_id);
create index if not exists approvals_company_id_idx on approvals(company_id);
create index if not exists tasks_company_id_idx on tasks(company_id);
create index if not exists datasets_company_id_idx on datasets(company_id);
create index if not exists skills_company_id_idx on skills(company_id);
create index if not exists marketplace_items_seller_company_id_idx on marketplace_items(seller_company_id);
create index if not exists subscriptions_company_id_idx on subscriptions(company_id);

alter table profiles enable row level security;
alter table companies enable row level security;
alter table company_members enable row level security;
alter table agents enable row level security;
alter table teams enable row level security;
alter table team_agents enable row level security;
alter table workflows enable row level security;
alter table approvals enable row level security;
alter table tasks enable row level security;
alter table datasets enable row level security;
alter table skills enable row level security;
alter table marketplace_items enable row level security;
alter table subscriptions enable row level security;

drop policy if exists "profiles_select_own" on profiles;
create policy "profiles_select_own"
on profiles for select
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on profiles;
create policy "profiles_insert_own"
on profiles for insert
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on profiles;
create policy "profiles_update_own"
on profiles for update
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "companies_owner_all" on companies;
create policy "companies_owner_all"
on companies for all
using (auth.uid() = owner_id)
with check (auth.uid() = owner_id);
