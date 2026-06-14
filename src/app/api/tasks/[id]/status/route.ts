import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function GET(
  _req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const supabase = createSupabaseAdmin();

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", id)
    .single();

  if (taskError) return NextResponse.json({ error: taskError.message }, { status: 500 });

  const { data: approvals } = await supabase
    .from("approvals")
    .select("*")
    .eq("task_id", id)
    .order("created_at", { ascending: false });

  const { data: events } = await supabase
    .from("execution_events")
    .select("*")
    .eq("task_id", id)
    .order("created_at", { ascending: true });

  return NextResponse.json({
    task,
    approvals: approvals || [],
    events: events || [],
  });
}
