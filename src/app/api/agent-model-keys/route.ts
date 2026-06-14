import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { encryptSecret } from "@/lib/crypto/simple-encryption";
import { maskSecret } from "@/lib/crypto/mask";

export async function GET(req: Request) {
  const agentId = new URL(req.url).searchParams.get("agent_id");

  if (!agentId) {
    return NextResponse.json({ error: "Missing agent_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_model_keys")
    .select("*")
    .eq("agent_id", agentId)
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const safe = (data || []).map((item) => ({
    ...item,
    encrypted_key: maskSecret(item.encrypted_key),
  }));

  return NextResponse.json({ keys: safe });
}

export async function POST(req: Request) {
  const supabase = createSupabaseAdmin();
  const body = await req.json();

  if (!body.agent_id || !body.provider || !body.api_key) {
    return NextResponse.json(
      { error: "agent_id, provider, and api_key are required." },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("agent_model_keys")
    .insert({
      agent_id: body.agent_id,
      provider: body.provider,
      encrypted_key: encryptSecret(body.api_key),
    })
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    key: {
      ...data,
      encrypted_key: maskSecret(data.encrypted_key),
    },
  });
}
