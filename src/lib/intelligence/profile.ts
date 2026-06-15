import { createSupabaseAdmin } from "@/lib/supabase/server";

function pushUnique(list: unknown, value: unknown) {
  const arr = Array.isArray(list) ? list : [];
  if (!value) return arr;
  if (arr.includes(value)) return arr;
  return [...arr, value].slice(-50);
}

export async function rebuildCompanyIntelligenceProfile(companyId: string) {
  const supabase = createSupabaseAdmin();

  const [eventsRes, decisionsRes] = await Promise.all([
    supabase
      .from("intelligence_events")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(200),
    supabase
      .from("company_decision_memory")
      .select("*")
      .eq("company_id", companyId)
      .order("created_at", { ascending: false })
      .limit(100),
  ]);

  const events = eventsRes.data || [];
  const decisions = decisionsRes.data || [];

  let successfulPatterns: unknown[] = [];
  let rejectedPatterns: unknown[] = [];
  let preferredChannels: unknown[] = [];
  let preferredSuppliers: unknown[] = [];
  let operatingPrinciples: unknown[] = [];

  for (const event of events) {
    if (event.event_type === "execution_success") {
      successfulPatterns = pushUnique(successfulPatterns, event.title);
    }

    if (event.event_type === "execution_failure") {
      rejectedPatterns = pushUnique(rejectedPatterns, event.title);
    }
  }

  for (const decision of decisions) {
    if (decision.decision_type?.includes("channel")) {
      preferredChannels = pushUnique(preferredChannels, decision.user_choice);
    }

    if (decision.decision_type?.includes("supplier")) {
      preferredSuppliers = pushUnique(preferredSuppliers, decision.user_choice);
    }

    if (decision.rejected_choice) {
      rejectedPatterns = pushUnique(rejectedPatterns, decision.rejected_choice);
    }

    operatingPrinciples = pushUnique(
      operatingPrinciples,
      `${decision.decision_type}: prefer ${decision.user_choice}`
    );
  }

  const learnedSummary = [
    successfulPatterns.length ? `Successful patterns: ${successfulPatterns.join(", ")}` : "",
    rejectedPatterns.length ? `Rejected patterns: ${rejectedPatterns.join(", ")}` : "",
    preferredChannels.length ? `Preferred channels: ${preferredChannels.join(", ")}` : "",
    preferredSuppliers.length ? `Preferred suppliers: ${preferredSuppliers.join(", ")}` : "",
  ].filter(Boolean).join("\n");

  const { data, error } = await supabase
    .from("company_intelligence_profile")
    .upsert(
      {
        company_id: companyId,
        preferred_channels: preferredChannels,
        preferred_suppliers: preferredSuppliers,
        rejected_patterns: rejectedPatterns,
        successful_patterns: successfulPatterns,
        operating_principles: operatingPrinciples,
        learned_summary: learnedSummary,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getCompanyIntelligenceProfile(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data } = await supabase
    .from("company_intelligence_profile")
    .select("*")
    .eq("company_id", companyId)
    .maybeSingle();

  if (data) return data;

  return rebuildCompanyIntelligenceProfile(companyId);
}
