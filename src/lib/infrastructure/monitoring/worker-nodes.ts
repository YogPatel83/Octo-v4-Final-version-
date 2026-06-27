import os from "os";
import { createSupabaseAdmin } from "@/lib/supabase/server";

export async function upsertWorkerHeartbeat(input: {
  worker_name: string;
  worker_secret: string;
  company_id?: string | null;
  version?: string | null;
  region?: string | null;
  capabilities?: string[];
  running_jobs?: number;
  max_jobs?: number;
  metadata?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const hostname = os.hostname();

  const { data, error } = await supabase
    .from("worker_nodes")
    .upsert(
      {
        company_id: input.company_id || null,
        worker_name: input.worker_name,
        worker_secret: input.worker_secret,
        version: input.version || null,
        hostname,
        region: input.region || null,
        capabilities: input.capabilities || [],
        status: "online",
        cpu_usage: 0,
        ram_usage: Math.round((1 - os.freemem() / os.totalmem()) * 100),
        running_jobs: input.running_jobs || 0,
        max_jobs: input.max_jobs || 10,
        last_seen: new Date().toISOString(),
        metadata: input.metadata || {},
        updated_at: new Date().toISOString(),
      },
      { onConflict: "worker_name" }
    )
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function listWorkerNodes(companyId?: string | null) {
  const supabase = createSupabaseAdmin();

  let query = supabase
    .from("worker_nodes")
    .select("*")
    .order("last_seen", { ascending: false });

  if (companyId) query = query.eq("company_id", companyId);

  const { data, error } = await query;

  if (error) throw new Error(error.message);

  return data || [];
}
