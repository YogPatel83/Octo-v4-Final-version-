import { NextRequest, NextResponse } from "next/server";
import { verifyWorkerRequest } from "@/lib/security/worker-auth";
import { createSupabaseAdmin } from "@/lib/supabase/server";
import { processBuildRun } from "@/lib/build/process-build-run";

export async function POST(req: NextRequest) {
  if (!verifyWorkerRequest(req)) {
    return NextResponse.json({ error: "Unauthorized worker." }, { status: 401 });
  }

  const supabase = createSupabaseAdmin();

  const { data: run, error } = await supabase
    .from("build_runs")
    .select("*")
    .eq("status", "queued")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (!run) {
    return NextResponse.json({
      processed: false,
      reason: "No queued build runs.",
    });
  }

  const result = await processBuildRun(run.id);

  return NextResponse.json({
    processed: true,
    result,
  });
}
