import { NextResponse } from "next/server";
import { createSupabaseAdmin } from "@/lib/supabase/server";

function generateSecret() {
  return crypto.randomUUID() + "-" + crypto.randomUUID();
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.worker_url) {
    return NextResponse.json(
      { error: "company_id and worker_url are required." },
      { status: 400 }
    );
  }

  const supabase = createSupabaseAdmin();
  const workerSecret = body.worker_secret || generateSecret();

  const { data, error } = await supabase
    .from("private_deployment_settings")
    .upsert(
      {
        company_id: body.company_id,
        deployment_mode: body.deployment_mode || "self_hosted",
        self_hosted_enabled: true,
        server_url: body.server_url || null,
        worker_url: body.worker_url,
        worker_secret: workerSecret,
        billing_mode: body.billing_mode || "self_hosted_runtime_credits",
        model_mode: body.model_mode || "byok_only",
        status: "configured",
        updated_at: new Date().toISOString(),
        metadata: body.metadata || {},
      },
      { onConflict: "company_id" }
    )
    .select()
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    settings: data,
    worker_secret: workerSecret,
    instructions: {
      required_env: {
        OCTO_WORKER_SECRET: workerSecret,
        NEXT_PUBLIC_APP_URL: body.server_url || body.worker_url,
      },
      health_endpoint: `${body.worker_url}/api/octo/self-hosted/health`,
      execution_endpoint: `${body.worker_url}/api/octo/self-hosted/execute`,
    },
  });
}
