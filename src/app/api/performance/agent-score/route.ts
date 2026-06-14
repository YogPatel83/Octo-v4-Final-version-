import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { calculatePerformanceScore } from "@/lib/performance/score";

export async function GET(req: Request) {
  const agentId = new URL(req.url).searchParams.get("agent_id");

  if (!agentId) {
    return NextResponse.json({ error: "agent_id is required." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { count: completed } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("agent_id", agentId)
    .eq("status", "completed");

  const { count: failed } = await supabase
    .from("tasks")
    .select("id", { count: "exact", head: true })
    .eq("agent_id", agentId)
    .eq("status", "failed");

  const { count: approvals } = await supabase
    .from("approvals")
    .select("id", { count: "exact", head: true })
    .eq("status", "pending");

  const score = calculatePerformanceScore({
    completed_tasks: completed || 0,
    failed_tasks: failed || 0,
    approval_blocks: approvals || 0,
    average_roi_score: 60,
  });

  return NextResponse.json({ agent_id: agentId, score });
}
