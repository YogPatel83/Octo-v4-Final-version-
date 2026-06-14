-- Example only.
-- Replace the owner_id with a real auth.users.id from Supabase before running.

insert into companies (owner_id, name, industry, objective)
values (
  '00000000-0000-0000-0000-000000000000',
  'Demo Company',
  'AI Operations',
  'Use Octo to run business operations with AI workers.'
);
