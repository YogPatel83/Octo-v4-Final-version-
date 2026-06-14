import { NextResponse } from "next/server";
import { paddleApi } from "@/lib/paddle/api";
import { CREDIT_PACKS } from "@/lib/credits/packs";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.pack_key || !body.customer_email || !body.price_id) {
    return NextResponse.json(
      { error: "company_id, pack_key, customer_email, and price_id are required." },
      { status: 400 }
    );
  }

  const pack = CREDIT_PACKS.find((item) => item.key === body.pack_key);

  if (!pack) {
    return NextResponse.json({ error: "Invalid credit pack." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: purchase, error } = await supabase
    .from("credit_purchases")
    .insert({
      company_id: body.company_id,
      credits: pack.credits,
      amount_cents: pack.amount_cents,
      provider: "paddle",
      status: "pending",
      metadata: {
        pack_key: pack.key,
        label: pack.label,
      },
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

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
        type: "credit_pack",
        credit_purchase_id: purchase.id,
        pack_key: pack.key,
        credits: pack.credits,
      },
      checkout: {
        url: body.success_url || process.env.NEXT_PUBLIC_APP_URL,
      },
    },
  });

  return NextResponse.json({
    purchase,
    checkout: result,
  }, { status: result.ok ? 200 : 500 });
}
