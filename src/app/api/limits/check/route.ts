import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { getCompanyCounts } from "@/lib/usage/counts";
import { canUseResource } from "@/lib/usage/limits";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.resource) {
    return NextResponse.json(
      { error: "company_id and resource are required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("company_id", body.company_id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  const plan = subscription?.plan || "free";
  const counts = await getCompanyCounts(body.company_id);

  const result = canUseResource({
    plan,
    resource: body.resource,
    current_count: counts[body.resource as keyof typeof counts] || 0,
  });

  return NextResponse.json({
    plan,
    resource: body.resource,
    result,
  });
}
