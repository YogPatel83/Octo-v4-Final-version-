import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "Missing company_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ wallet: data });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  const { data, error } = await supabase
    .from("credit_wallets")
    .upsert({
      company_id: body.company_id,
      balance: body.balance || 0,
      updated_at: new Date().toISOString(),
    }, { onConflict: "company_id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ wallet: data });
}

export async function PATCH(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  if (!body.company_id || typeof body.amount !== "number") {
    return NextResponse.json({ error: "company_id and amount are required." }, { status: 400 });
  }

  const { data: wallet, error: readError } = await supabase
    .from("credit_wallets")
    .select("*")
    .eq("company_id", body.company_id)
    .maybeSingle();

  if (readError) return NextResponse.json({ error: readError.message }, { status: 500 });

  const nextBalance = (wallet?.balance || 0) + body.amount;

  const { data, error } = await supabase
    .from("credit_wallets")
    .upsert({
      company_id: body.company_id,
      balance: nextBalance,
      updated_at: new Date().toISOString(),
    }, { onConflict: "company_id" })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ wallet: data });
}
