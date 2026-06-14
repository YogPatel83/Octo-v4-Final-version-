import { NextResponse } from "next/server";
import { createExternalApiRequest } from "@/lib/external-apis/request";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.category || !body.provider || !body.action) {
    return NextResponse.json(
      { error: "company_id, category, provider, and action are required." },
      { status: 400 }
    );
  }

  const request = await createExternalApiRequest({
    company_id: body.company_id,
    category: body.category,
    provider: body.provider,
    action: body.action,
    payload: body.payload || {}
  });

  return NextResponse.json({ request });
}
