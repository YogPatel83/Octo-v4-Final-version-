import { createSupabaseAdmin } from "@/lib/supabase/server";
import { callAI } from "@/lib/ai/call-ai";
import { createAdvancedAuditEvent } from "@/lib/security/audit/advanced-audit";

export async function generateSupabaseSchema(input: {
  company_id: string;
  build_project_id?: string | null;
  objective: string;
  requirements?: Record<string, unknown>;
}) {
  const supabase = createSupabaseAdmin();

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content:
          "You generate safe Supabase PostgreSQL schema drafts. Return strict JSON only. Do not include destructive SQL. Never drop tables. Never delete data.",
      },
      {
        role: "user",
        content: `
Generate a Supabase schema draft for this build.

Rules:
- Return JSON only.
- No DROP statements.
- No DELETE statements.
- No destructive SQL.
- Use create table if not exists.
- Include useful indexes.
- Include safety notes.
- This SQL must require human approval before applying.

Shape:
{
  "tables": [
    {
      "name": "...",
      "purpose": "...",
      "columns": []
    }
  ],
  "sql": "...",
  "safety_notes": []
}

Objective:
${input.objective}

Requirements:
${JSON.stringify(input.requirements || {}).slice(0, 12000)}
`,
      },
    ],
  });

  let parsed: any = {
    tables: [],
    sql: "",
    safety_notes: ["Could not parse schema output."],
  };

  try {
    parsed = JSON.parse(response.content || "{}");
  } catch {}

  const generatedSql = String(parsed.sql || "");

  const unsafe =
    /\bdrop\s+table\b/i.test(generatedSql) ||
    /\bdelete\s+from\b/i.test(generatedSql) ||
    /\btruncate\b/i.test(generatedSql);

  const { data, error } = await supabase
    .from("build_schema_generations")
    .insert({
      company_id: input.company_id,
      build_project_id: input.build_project_id || null,
      status: unsafe ? "blocked" : "draft",
      objective: input.objective,
      generated_sql: generatedSql,
      tables: parsed.tables || [],
      safety_notes: unsafe
        ? [...(parsed.safety_notes || []), "Blocked because destructive SQL was detected."]
        : parsed.safety_notes || [],
      approval_required: true,
      error: unsafe ? "Unsafe SQL detected." : null,
      metadata: {
        requirements: input.requirements || {},
        raw: parsed,
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  await createAdvancedAuditEvent({
    company_id: input.company_id,
    actor_type: "system",
    event_type: "supabase_schema_generated",
    entity_type: "build_schema_generations",
    entity_id: data.id,
    action: "generate_schema",
    severity: unsafe ? "high" : "info",
    metadata: {
      build_project_id: input.build_project_id || null,
      unsafe,
    },
  });

  return {
    ok: !unsafe,
    schema: data,
  };
}
