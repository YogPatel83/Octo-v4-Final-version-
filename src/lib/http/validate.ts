export function requireFields(body: Record<string, unknown>, fields: string[]) {
  const missing = fields.filter((field) => {
    const value = body[field];
    return value === undefined || value === null || value === "";
  });

  return {
    ok: missing.length === 0,
    missing,
  };
}
