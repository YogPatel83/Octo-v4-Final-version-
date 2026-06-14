import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { createAuditLog } from "@/lib/audit/log";
import { createExecutionEvent } from "@/lib/workers/task-events";
import { markTaskFailed } from "@/lib/workers/failure";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const body = await req.json();

  if (!body.task_id) {
    return NextResponse.json({ error: "Missing task_id." }, { status: 400 });
  }

  const supabase = createSupabaseAdmin();

  const { data: task, error: taskError } = await supabase
    .from("tasks")
    .select("*")
    .eq("id", body.task_id)
    .single();

  if (taskError) return NextResponse.json({ error: taskError.message }, { status: 500 });

  if (body.status === "failed") {
    const failed = await markTaskFailed({
      task_id: body.task_id,
      error_message: body.error_message || "Worker reported failure.",
      metadata: body.metadata || {},
    });

    return NextResponse.json({ task: failed });
  }

  const status = body.status || "completed";

  const { data, error } = await supabase
    .from("tasks")
    .update({
      status,
      output: body.output || {},
    })
    .eq("id", body.task_id)
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  await createExecutionEvent({
    company_id: task.company_id,
    task_id: task.id,
    event_type: `task_${status}`,
    message: `Task ${status}`,
    metadata: {
      output: body.output || {},
    },
  });

  await createAuditLog({
    company_id: task.company_id,
    action: `task_${status}`,
    metadata: {
      task_id: body.task_id,
      output: body.output || {},
    },
  });

  return NextResponse.json({ task: data });
}
