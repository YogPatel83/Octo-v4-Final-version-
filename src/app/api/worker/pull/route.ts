import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();

  const { data: task, error } = await supabase
    .from("tasks")
    .select("*")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!task) {
    return NextResponse.json({ task: null });
  }

  const { data: updated, error: updateError } = await supabase
    .from("tasks")
    .update({ status: "running" })
    .eq("id", task.id)
    .select()
    .single();

  if (updateError) {
    return NextResponse.json({ error: updateError.message }, { status: 500 });
  }

  return NextResponse.json({ task: updated });
}
