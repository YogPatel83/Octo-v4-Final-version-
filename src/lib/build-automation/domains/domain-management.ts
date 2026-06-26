import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function addBuildDomain(input: {
  company_id: string;
  build_project_id?: string | null;
  domain: string;
  provider?: string;
}) {
  const supabase = createSupabaseAdmin();

  const cleanDomain = input.domain
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .trim();

  const { data, error } = await supabase
    .from("build_domains")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      domain: cleanDomain,
      provider: input.provider || "vercel",
      status: "pending",
      dns_status: "needs_setup",
      verification: {
        note: "Domain added. DNS records must be configured with the provider.",
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    actor_type: "system",
    event_type: "build_domain_added",
    entity_type: "build_domains",
    entity_id: data.id,
    action: "add_domain",
    severity: "medium",
    metadata: { domain: cleanDomain },
  });

  return data;
}

export async function listBuildDomains(companyId: string) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("build_domains")
    .select("*")
    .eq("company_id", companyId)
    .order("created_at", { ascending: false });

  if (error) throw new Error(error.message);

  return data || [];
}
