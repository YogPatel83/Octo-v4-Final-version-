import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function userCanAccessCompany(input: {
  user_id: string;
  company_id: string;
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
      company,
    };
  }

  const { data: member } = await supabase
    .from("company_members")
    .select("*")
    .eq("company_id", input.company_id)
    .eq("user_id", input.user_id)
    .maybeSingle();

  if (member) {
    return {
      allowed: true,
      role: member.role || "member",
      company,
    };
  }

  return {
    allowed: false,
    role: null,
    company: null,
  };
}
