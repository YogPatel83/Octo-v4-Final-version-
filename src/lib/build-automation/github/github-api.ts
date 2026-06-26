export async function githubApi(input: {
  path: string;
  method?: string;
  token?: string | null;
  body?: Record<string, unknown>;
}) {
  const token = input.token || process.env.GITHUB_TOKEN;

  if (!token) {
    return {
      ok: false,
      status: 500,
      data: null,
      error: "GITHUB_TOKEN is missing.",
    };
  }

  const res = await fetch(`https://api.github.com${input.path}`, {
    method: input.method || "GET",
    headers: {
      "accept": "application/vnd.github+json",
      "authorization": `Bearer ${token}`,
      "x-github-api-version": "2022-11-28",
      "content-type": "application/json",
    },
    body: input.body ? JSON.stringify(input.body) : undefined,
  });

  const text = await res.text();
  let data: unknown = text;

  try {
    data = JSON.parse(text);
  } catch {}

  return {
    ok: res.ok,
    status: res.status,
    data,
    error: res.ok ? null : text,
  };
}
