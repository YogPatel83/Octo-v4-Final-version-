import crypto from "crypto";
import { createSupabaseAdmin } from "@/lib/supabase/server";

function createSecret() {
  return crypto.randomBytes(24).toString("hex");
}

export async function createWebhookBuilder(input: {
  company_id: string;
  name: string;
  description?: string | null;
  method?: string;
  schema?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();
  const secret = createSecret();

  const { data, error } = await supabase
    .from("webhook_builders")
    .insert({
      company_id: input.company_id,
      name: input.name,
      description: input.description || null,
      method: input.method || "POST",
      secret,
      status: "active",
      schema: input.schema || {},
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  const webhookUrl = `${process.env.NEXT_PUBLIC_APP_URL || ""}/api/integrations/webhooks/events?webhook_id=${data.id}`;

  const { data: updated, error: updateError } = await supabase
    .from("webhook_builders")
    .update({
      webhook_url: webhookUrl,
      updated_at: new Date().toISOString(),
    })
    .eq("id", data.id)
    .select()
    .single();

  if (updateError) throw new Error(updateError.message);

  return {
    ...updated,
    secret,
  };
}

export async function listWebhookBuilders(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("webhook_builders")
    .select("id, company_id, name, description, webhook_url, method, status, schema, metadata, created_at, updated_at")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
