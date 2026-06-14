import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const url = new URL(req.url);

  return NextResponse.json({
    status: "placeholder",
    message: "Composio OAuth callback received.",
    code: url.searchParams.get("code"),
    state: url.searchParams.get("state"),
  });
}
