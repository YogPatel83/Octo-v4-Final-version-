import { NextResponse } from "next/server";
import { paddleApi } from "@/lib/paddle/api";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.price_id || !body.customer_email) {
    return NextResponse.json(
      { error: "company_id, price_id, and customer_email are required." },
      { status: 400 }
    );
  }

  const result = await paddleApi({
    path: "/transactions",
    method: "POST",
    body: {
      items: [
        {
          price_id: body.price_id,
          quantity: 1,
        },
      ],
      customer: {
        email: body.customer_email,
      },
      custom_data: {
        company_id: body.company_id,
        plan: body.plan || "pro",
      },
      checkout: {
        url: body.success_url || process.env.NEXT_PUBLIC_APP_URL,
      },
    },
  });

  return NextResponse.json({
    checkout: result,
  }, { status: result.ok ? 200 : 500 });
}
