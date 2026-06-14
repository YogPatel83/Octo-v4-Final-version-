import { createSupabaseAdmin } from "@/lib/supabase/server";
import { userCanAccessCompany } from "@/lib/company/access";
import { isAccessCheckAllowedTable } from "@/lib/security/allowed-tables";

export async function userCanAccessResource(input: {
  user_id: string;
  table: string;
  resource_id: string;
  company_field?: string;
}) {
  if (!isAccessCheckAllowedTable(input.table)) {
    return {
      allowed: false,
      error: "Table is not allowed for access checks.",
      resource: null,
    };
  }

  const supabase = createSupabaseAdmin();
  const companyField = input.company_field || "company_id";

  const { data, error } = await supabase
    .from(input.table)
    .select("*")
    .eq("id", input.resource_id)
    .maybeSingle();

  if (error) {
    return {
      allowed: false,
      error: error.message,
      resource: null,
    };
  }

  if (!data) {
    return {
      allowed: false,
      error: "Resource not found.",
      resource: null,
    };
  }

  const companyId =
    input.table === "companies"
      ? data.id
      : data[companyField];

  if (!companyId) {
    return {
      allowed: false,
      error: "Resource has no company_id.",
      resource: data,
    };
  }

  const access = await userCanAccessCompany({
    user_id: input.user_id,
    company_id: companyId,
  });

  return {
    allowed: access.allowed,
    role: access.role,
    resource: data,
  };
}
