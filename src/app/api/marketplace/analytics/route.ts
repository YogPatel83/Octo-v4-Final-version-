import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET() {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("marketplace_orders")
    .select("*");

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const totalRevenue =
    (data || []).reduce(
      (sum, item) => sum + (item.amount_cents || 0),
      0
    );

  const platformRevenue =
    (data || []).reduce(
      (sum, item) => sum + (item.platform_fee_cents || 0),
      0
    );

  return NextResponse.json({
    orders: data?.length || 0,
    gross_revenue_cents: totalRevenue,
    platform_revenue_cents: platformRevenue,
  });
}
