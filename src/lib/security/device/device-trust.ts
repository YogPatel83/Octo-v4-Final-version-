import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createSecurityEvent } from "@/lib/security/security-events";
import { recordSessionEvent } from "@/lib/security/session/session-events";

export function createDeviceFingerprint(input: {
  user_agent?: string | null;
  ip_address?: string | null;
}) {
  const source = `${input.user_agent || "unknown"}:${input.ip_address || "unknown"}`;
  return Buffer.from(source).toString("base64").slice(0, 120);
}

export async function checkDeviceTrust(input: {
  user_id?: string | null;
  company_id?: string | null;
  ip_address?: string | null;
  user_agent?: string | null;
  device_name?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const fingerprint = createDeviceFingerprint({
    ip_address: input.ip_address,
    user_agent: input.user_agent,
  });

  const { data: existing, error } = await supabase
    .from("trusted_devices")
    .select("*")
    .eq("device_fingerprint", fingerprint)
    .maybeSingle();

  if (error) throw new Error(error.message);

  if (existing) {
    await supabase
      .from("trusted_devices")
      .update({
        last_seen_at: new Date().toISOString(),
        ip_address: input.ip_address || null,
        user_agent: input.user_agent || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing.id);

    await recordSessionEvent({
      user_id: input.user_id || null,
      company_id: input.company_id || null,
      event_type: "known_device_seen",
      ip_address: input.ip_address || null,
      user_agent: input.user_agent || null,
      metadata: { device_id: existing.id, trusted: existing.trusted },
    });

    return {
      known: true,
      trusted: Boolean(existing.trusted),
      device: existing,
    };
  }

  const { data: created, error: createError } = await supabase
    .from("trusted_devices")
    .insert({
      user_id: input.user_id || null,
      company_id: input.company_id || null,
      device_fingerprint: fingerprint,
      device_name: input.device_name || "New device",
      ip_address: input.ip_address || null,
      user_agent: input.user_agent || null,
      trusted: false,
    })
    .select()
    .single();

  if (createError) throw new Error(createError.message);

  await supabase.from("suspicious_login_events").insert({
    user_id: input.user_id || null,
    company_id: input.company_id || null,
    device_fingerprint: fingerprint,
    ip_address: input.ip_address || null,
    user_agent: input.user_agent || null,
    reason: "New device detected.",
    severity: "medium",
    status: "open",
    metadata: {
      device_id: created.id,
    },
  });

  await createSecurityEvent({
    company_id: input.company_id || null,
    user_id: input.user_id || null,
    event_type: "new_device_detected",
    severity: "medium",
    ip_address: input.ip_address || null,
    user_agent: input.user_agent || null,
    message: "A new device was detected for this user.",
    metadata: {
      device_id: created.id,
      fingerprint,
    },
  });

  return {
    known: false,
    trusted: false,
    device: created,
    alert: "new_device_detected",
  };
}

export async function trustDevice(input: {
  device_id: string;
  trusted: boolean;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("trusted_devices")
    .update({
      trusted: input.trusted,
      updated_at: new Date().toISOString(),
    })
    .eq("id", input.device_id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
