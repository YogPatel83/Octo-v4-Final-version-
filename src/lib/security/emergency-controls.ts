import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function getEmergencyControls(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("emergency_controls")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (error) throw new Error(error.message);

  return data;
}

export async function setEmergencyControls(input: {
  company_id: string;
  executions_paused?: boolean;
  outbound_paused?: boolean;
  billing_paused?: boolean;
  marketplace_paused?: boolean;
  reason?: string | null;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("emergency_controls")
    .upsert(
      {
        company_id: input.company_id,
        executions_paused: input.executions_paused || false,
        outbound_paused: input.outbound_paused || false,
        billing_paused: input.billing_paused || false,
        marketplace_paused: input.marketplace_paused || false,
        reason: input.reason || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function assertNotPaused(input: {
  company_id: string;
  type: "execution" | "outbound" | "billing" | "marketplace";
}) {
  const controls = await getEmergencyControls(input.company_id);

  if (!controls) return { allowed: true };

  if (input.type === "execution" && controls.executions_paused) {
    return { allowed: false, reason: controls.reason || "Executions are paused." };
  }

  if (input.type === "outbound" && controls.outbound_paused) {
    return { allowed: false, reason: controls.reason || "Outbound actions are paused." };
  }

  if (input.type === "billing" && controls.billing_paused) {
    return { allowed: false, reason: controls.reason || "Billing is paused." };
  }

  if (input.type === "marketplace" && controls.marketplace_paused) {
    return { allowed: false, reason: controls.reason || "Marketplace is paused." };
  }

  return { allowed: true };
}
