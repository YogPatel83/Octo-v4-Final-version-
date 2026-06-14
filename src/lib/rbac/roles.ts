export const ROLE_PERMISSIONS = {
  owner: ["*"],
  admin: [
    "company:read",
    "company:update",
    "agent:*",
    "team:*",
    "workflow:*",
    "approval:*",
    "billing:*",
    "marketplace:*",
  ],
  operator: [
    "company:read",
    "agent:read",
    "agent:execute",
    "team:read",
    "team:execute",
    "workflow:read",
    "workflow:execute",
    "approval:read",
  ],
  viewer: [
    "company:read",
    "agent:read",
    "team:read",
    "workflow:read",
    "approval:read",
  ],
} as const;

export type CompanyRole = keyof typeof ROLE_PERMISSIONS;

export function roleCan(role: string, permission: string) {
  const permissions = ROLE_PERMISSIONS[role as CompanyRole] || [];

  return (
    permissions.includes("*" as never) ||
    permissions.includes(permission as never) ||
    permissions.some((item) => {
      const text = String(item);
      return text.endsWith(":*") && permission.startsWith(text.replace(":*", ":"));
    })
  );
}
