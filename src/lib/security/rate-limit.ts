const memoryStore = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(input: {
  key: string;
  limit: number;
  window_ms: number;
}) {
  const now = Date.now();
  const existing = memoryStore.get(input.key);

  if (!existing || existing.resetAt < now) {
    memoryStore.set(input.key, {
      count: 1,
      resetAt: now + input.window_ms,
    });

    return {
      allowed: true,
      remaining: input.limit - 1,
      reset_at: now + input.window_ms,
    };
  }

  if (existing.count >= input.limit) {
    return {
      allowed: false,
      remaining: 0,
      reset_at: existing.resetAt,
    };
  }

  existing.count += 1;
  memoryStore.set(input.key, existing);

  return {
    allowed: true,
    remaining: input.limit - existing.count,
    reset_at: existing.resetAt,
  };
}

export function simpleRateLimit(
  input:
    | string
    | {
        key: string;
        limit?: number;
        windowMs?: number;
        window_ms?: number;
      },
  limit = 60,
  windowMs = 60000
) {
  if (typeof input === "string") {
    return rateLimit({
      key: input,
      limit,
      window_ms: windowMs,
    });
  }

  return rateLimit({
    key: input.key,
    limit: input.limit || 60,
    window_ms: input.windowMs || input.window_ms || 60000,
  });
}
