import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { createAuditLog } from "@/lib/audit/log";

export async function POST(
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

  const { data, error } = await supabase
    .from("tasks")
    .update({
      status: "queued",
    })
    .eq("id", id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await createAuditLog({
    company_id: task.company_id,
    action: "task_retried",
    metadata: {
      task_id: id,
    },
  });

  return NextResponse.json({ task: data });
}
