import { createSupabaseAdmin } from "@/lib/supabase/server";
import { scanPromptForInjection } from "@/lib/security/prompt-injection";

const BLOCKED_EXTENSIONS = [
  ".exe",
  ".bat",
  ".cmd",
  ".scr",
  ".js",
  ".vbs",
  ".ps1",
  ".sh",
  ".php",
  ".jar",
];

const MAX_FILE_BYTES = 25 * 1024 * 1024;

export async function scanFileSecurity(input: {
  company_id: string;
  file_id?: string | null;
  file_name: string;
  mime_type?: string | null;
  size_bytes?: number | null;
  extracted_text?: string | null;
}) {
  const supabase = createSupabaseAdmin();
  const reasons: string[] = [];
  const lower = input.file_name.toLowerCase();

  for (const extension of BLOCKED_EXTENSIONS) {
    if (lower.endsWith(extension)) {
      reasons.push(`Blocked executable/script extension: ${extension}`);
    }
  }

  if (input.size_bytes && input.size_bytes > MAX_FILE_BYTES) {
    reasons.push("File is larger than allowed security limit.");
  }

  if (input.extracted_text) {
    const promptScan = scanPromptForInjection(input.extracted_text);
    if (!promptScan.safe) {
      reasons.push("Prompt injection detected inside uploaded file.");
    }
  }

  const verdict = reasons.length > 0 ? "blocked" : "allowed";

  const { data, error } = await supabase
    .from("file_security_scans")
    .insert({
      company_id: input.company_id,
      file_id: input.file_id || null,
      file_name: input.file_name,
      mime_type: input.mime_type || null,
      status: "completed",
      verdict,
      reasons,
      metadata: {
        size_bytes: input.size_bytes || null,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    allowed: verdict === "allowed",
    scan: data,
  };
}
