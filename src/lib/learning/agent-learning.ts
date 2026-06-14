import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function generateAgentLearningProfile(
  agentId: string
) {
  const supabase = createSupabaseAdmin();

  const { count: completed } =
    await supabase
      .from("tasks")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("agent_id", agentId)
      .eq("status", "completed");

  const { count: failed } =
    await supabase
      .from("tasks")
      .select("id", {
        count: "exact",
        head: true,
      })
      .eq("agent_id", agentId)
      .eq("status", "failed");

  const score =
    completed || 0
      ? ((completed || 0) /
          ((completed || 0) + (failed || 0))) *
        100
      : 0;

  return {
    agent_id: agentId,
    completed_tasks: completed || 0,
    failed_tasks: failed || 0,
    learning_score: Math.round(score),
    recommendation:
      score > 80
        ? "high_performer"
        : score > 50
          ? "improving"
          : "needs_training",
  };
}
