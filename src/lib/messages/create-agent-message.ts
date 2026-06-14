import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function createAgentMessage(input: {
  company_id: string;
  from_agent_id?: string | null;
  to_agent_id?: string | null;
  team_id?: string | null;
  task_id?: string | null;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const { data, error } = await supabase
    .from("agent_messages")
    .insert({
      company_id: input.company_id,
      from_agent_id: input.from_agent_id || null,
      to_agent_id: input.to_agent_id || null,
      team_id: input.team_id || null,
      task_id: input.task_id || null,
      message: input.message,
      metadata: input.metadata || {},
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
