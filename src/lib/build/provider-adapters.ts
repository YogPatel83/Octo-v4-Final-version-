export async function githubAdapter(input: {
  action: string;
  token?: string | null;
  payload: Record<string, unknown>;
}) {
  if (!input.token) {
    return {
      ok: false,
      error: "Missing GitHub token.",
    };
  }

  return {
    ok: true,
    message: "GitHub adapter ready. Use this slot to create repos, branches, commits, and pull requests.",
    action: input.action,
    payload: input.payload,
  };
}

export async function supabaseProjectAdapter(input: {
  action: string;
  service_role_key?: string | null;
  payload: Record<string, unknown>;
}) {
  if (!input.service_role_key) {
    return {
      ok: false,
      error: "Missing Supabase service role key.",
    };
  }

  return {
    ok: true,
    message: "Supabase build adapter ready. Use this slot to apply approved SQL/schema changes.",
    action: input.action,
    payload: input.payload,
  };
}

export async function vercelAdapter(input: {
  action: string;
  token?: string | null;
  payload: Record<string, unknown>;
}) {
  if (!input.token) {
    return {
      ok: false,
      error: "Missing Vercel token.",
    };
  }

  return {
    ok: true,
    message: "Vercel adapter ready. Use this slot to create preview deployments and production deployments.",
    action: input.action,
    payload: input.payload,
  };
}

export async function domainAdapter(input: {
  action: string;
  token?: string | null;
  payload: Record<string, unknown>;
}) {
  if (!input.token) {
    return {
      ok: false,
      error: "Missing domain provider token.",
    };
  }

  return {
    ok: true,
    message: "Domain adapter ready. Domain purchase/connection always requires user approval.",
    action: input.action,
    payload: input.payload,
  };
}
