import { createSupabaseAdmin } from "@/lib/supabase/server";
import { roleCan } from "./roles";

export async function checkCompanyPermission(input: {
  company_id: string;
  user_id: string;
  permission: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data: company } = await supabase
    .from("companies")
    .select("*")
    .eq("id", input.company_id)
    .maybeSingle();

  if (company?.owner_id === input.user_id) {
    return {
      allowed: true,
      role: "owner",
      permission: input.permission,
    };
  }

  const { data: member } = await supabase
    .from("company_members")
    .select("*")
    .eq("company_id", input.company_id)
    .eq("user_id", input.user_id)
    .maybeSingle();

  const role = member?.role || "viewer";

  return {
    allowed: roleCan(role, input.permission),
    role,
    permission: input.permission,
  };
}
