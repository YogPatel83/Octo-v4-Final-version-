import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const buyerCompanyId = url.searchParams.get("buyer_company_id");
  const sellerCompanyId = url.searchParams.get("seller_company_id");

  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("marketplace_orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (buyerCompanyId) query = query.eq("buyer_company_id", buyerCompanyId);
  if (sellerCompanyId) query = query.eq("seller_company_id", sellerCompanyId);

  const { data, error } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ orders: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("marketplace_orders")
    .insert({
      buyer_company_id: body.buyer_company_id,
      seller_company_id: body.seller_company_id,
      marketplace_item_id: body.marketplace_item_id,
      status: body.status || "pending",
      price_cents: body.price_cents || 0,
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ order: data });
}
