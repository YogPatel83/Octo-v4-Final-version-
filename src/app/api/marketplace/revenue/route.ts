import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const sellerId =
    new URL(req.url).searchParams.get("seller_id");

  if (!sellerId) {
    return NextResponse.json(
      { error: "seller_id required" },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_orders")
    .select("*")
    .eq("seller_id", sellerId);

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const revenue =
    (data || []).reduce(
      (sum, item) =>
        sum + (item.seller_amount_cents || 0),
      0
    );

  return NextResponse.json({
    seller_id: sellerId,
    total_revenue_cents: revenue,
    order_count: data?.length || 0,
  });
}
