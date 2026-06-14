import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createExportRequest(input: {
  company_id: string;
  requested_by?: string | null;
  export_type?: string;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("audit_logs")
    .insert({
      company_id: input.company_id,
      actor_id: input.requested_by || null,
      action: "enterprise_export_requested",
      metadata: {
        export_type: input.export_type || "full_company_export",
        status: "requested",
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    export_request: data,
    status: "requested",
  };
}
