import { NextResponse } from "next/server";
import { updateCompanySubscription } from "@/lib/subscriptions/update-subscription";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json(
      { error: "company_id is required." },
      { status: 400 }
    );
  }

  const subscription = await updateCompanySubscription({
    company_id: body.company_id,
    plan: body.plan || "free",
    status: body.status || "active",
    trial_ends_at: body.trial_ends_at || null,
    paddle_customer_id: body.paddle_customer_id || null,
    customer_email: body.customer_email || null,
  });

  return NextResponse.json({ subscription });
}
