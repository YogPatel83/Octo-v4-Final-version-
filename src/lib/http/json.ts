import { NextResponse } from "next/server";

export function ok(data: Record<string, unknown> = {}, status = 200) {
  return NextResponse.json(data, { status });
}

export function badRequest(message: string, extra: Record<string, unknown> = {}) {
  return NextResponse.json({ error: message, ...extra }, { status: 400 });
}

export function unauthorized(message = "Unauthorized.") {
  return NextResponse.json({ error: message }, { status: 401 });
}

export function serverError(error: unknown) {
  const message = error instanceof Error ? error.message : "Internal server error.";
  return NextResponse.json({ error: message }, { status: 500 });
}
