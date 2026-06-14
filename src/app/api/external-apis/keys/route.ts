import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { saveExternalApiKey } from "@/lib/external-apis/keys";
import { maskSecret } from "@/lib/crypto/mask";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("external_api_keys")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    keys: (data || []).map((key) => ({
      ...key,
      encrypted_key: maskSecret(key.encrypted_key)
    }))
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.category || !body.provider || !body.api_key) {
    return NextResponse.json(
      { error: "company_id, category, provider, and api_key are required." },
      { status: 400 }
    );
  }

  const key = await saveExternalApiKey({
    company_id: body.company_id,
    category: body.category,
    provider: body.provider,
    api_key: body.api_key,
    base_url: body.base_url || null,
    metadata: body.metadata || {}
  });

  return NextResponse.json({ key });
}
