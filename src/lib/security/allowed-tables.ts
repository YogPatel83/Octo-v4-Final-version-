export const ACCESS_CHECK_ALLOWED_TABLES = [
  "companies",
  "agents",
  "teams",
  "workflows",
  "tasks",
  "approvals",
  "datasets",
  "skills",
  "marketplace_items",
  "memory_entries",
  "objectives",
];

export function isAccessCheckAllowedTable(table: string) {
  return ACCESS_CHECK_ALLOWED_TABLES.includes(table);
}
