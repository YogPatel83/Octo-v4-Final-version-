import { NextResponse } from "next/server";
import { paddleApi } from "@/lib/paddle/api";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.customer_id) {
    return NextResponse.json(
      { error: "customer_id is required." },
      { status: 400 }
    );
  }

  const result = await paddleApi({
    path: `/customers/${body.customer_id}/portal-sessions`,
    method: "POST",
    body: {
      urls: {
        general: body.return_url || process.env.NEXT_PUBLIC_APP_URL,
      },
    },
  });

  return NextResponse.json({
    portal: result,
  }, { status: result.ok ? 200 : 500 });
}
