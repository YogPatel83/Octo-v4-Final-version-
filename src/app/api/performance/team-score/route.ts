import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { calculatePerformanceScore } from "@/lib/performance/score";

export async function GET(req: Request) {
  const teamId = new URL(req.url).searchParams.get("team_id");

  if (!teamId) {
    return NextResponse.json({ error: "team_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: links } = await supabase
    .from("team_agents")
    .select("*")
    .eq("team_id", teamId);

  const agentIds = (links || []).map((link) => link.agent_id);

  if (agentIds.length === 0) {
    return NextResponse.json({
      team_id: teamId,
      score: calculatePerformanceScore({
        completed_tasks: 0,
        failed_tasks: 0,
        approval_blocks: 0,
        average_roi_score: 0,
      }),
    });
  }

  const { count: completed } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .in("agent_id", agentIds)
    .eq("status", "completed");

  const { count: failed } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .in("agent_id", agentIds)
    .eq("status", "failed");

  const score = calculatePerformanceScore({
    completed_tasks: completed || 0,
    failed_tasks: failed || 0,
    approval_blocks: 0,
    average_roi_score: 65,
  });

  return NextResponse.json({ team_id: teamId, score });
}
