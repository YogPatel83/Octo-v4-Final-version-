import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { encryptSecret } from "@/lib/crypto/simple-encryption";
import { maskSecret } from "@/lib/crypto/mask";

export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();
  const supabase = createSupabaseAdmin();

  const update: Record<string, string> = {};

  if (body.provider) update.provider = body.provider;
  if (body.api_key) update.encrypted_key = encryptSecret(body.api_key);

  const { data, error } = await supabase
    .from("agent_model_keys")
    .update(update)
    .eq("id", id)
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

export async function DELETE(_req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const supabase = createSupabaseAdmin();

  const { error } = await supabase.from("agent_model_keys").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ deleted: true });
}
