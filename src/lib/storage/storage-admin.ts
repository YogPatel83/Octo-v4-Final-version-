import { createSupabaseAdmin } from "@/lib/supabase/server";

export function getStorageAdmin() {
  return createSupabaseAdmin().storage;
}

export function getDefaultBucket() {
  return process.env.SUPABASE_STORAGE_BUCKET || "octo-files";
}
