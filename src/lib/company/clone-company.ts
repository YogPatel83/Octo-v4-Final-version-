import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function cloneCompany(sourceCompanyId: string) {
  const supabase = createSupabaseAdmin();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", sourceCompanyId)
    .single();

  if (!company) {
    throw new Error("Company not found");
  }

  return {
    source_company_id: sourceCompanyId,
    company_name: company.name,
    status: "clone_plan_generated",
    note: "Full deep clone logic will be connected later."
  };
}
