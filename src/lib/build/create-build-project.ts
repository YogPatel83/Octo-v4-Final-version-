import { createSupabaseAdmin } from "@/lib/supabase/server";
import { buildUsefulQuestions } from "./question-engine";

export async function createBuildProject(input: {
  company_id: string;
  name: string;
  objective: string;
}) {
  const supabase = createSupabaseAdmin();

  const questions = buildUsefulQuestions(input.objective);

  const { data, error } = await supabase
    .from("build_projects")
    .insert({
      company_id: input.company_id,
      name: input.name,
      objective: input.objective,
      status: "planning",
      metadata: {
        questions,
        next_step: "answer_questions_or_generate_plan",
      },
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}
