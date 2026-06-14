import { createSupabaseAdmin } from "@/lib/supabase/server";
import { detectChatIntent } from "./intent-router";
import { saveOctoPlan } from "@/lib/builder/save-octo-plan";
import { createGeneration } from "@/lib/models/generate";

export async function createChatAction(input: {
  user_id: string;
  company_id?: string | null;
  message: string;
}) {
  const supabase = createSupabaseAdmin();
  const intent = detectChatIntent(input.message);

  if (intent === "builder") {
    const result = await saveOctoPlan({
      owner_id: input.user_id,
      objective: input.message,
      company_name: "Nova Motors",
      industry: "AI-generated company",
    });

    return {
      intent,
      response: "I created a new company system.",
      result,
    };
  }

  if (!input.company_id) {
    return {
      intent,
      response: "Please select or create a company first.",
      result: null,
    };
  }

  if (intent === "generate_image") {
    const result = await createGeneration({
      company_id: input.company_id,
      user_id: input.user_id,
      type: "image",
      provider: "openai",
      model: "gpt-image-2",
      prompt: input.message,
    });

    return {
      intent,
      response: "I created an image generation request.",
      result,
    };
  }

  if (intent === "generate_video") {
    const result = await createGeneration({
      company_id: input.company_id,
      user_id: input.user_id,
      type: "video",
      provider: "google",
      model: "veo-3.1",
      prompt: input.message,
    });

    return {
      intent,
      response: "I created a video generation request.",
      result,
    };
  }

  const taskTitle =
    intent === "supplier_task"
      ? `Supplier task: ${input.message}`
      : intent === "finance_task"
        ? `Finance task: ${input.message}`
        : intent === "employee_notice"
          ? `Employee notice: ${input.message}`
          : input.message;

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      company_id: input.company_id,
      title: taskTitle,
      input: {
        source: "chat",
        message: input.message,
        intent,
      },
      status: "queued",
      risk_level:
        intent === "employee_notice" || intent === "supplier_task"
          ? "medium"
          : "low",
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return {
    intent,
    response: "I created a task and added it to the execution queue.",
    result: task,
  };
}
