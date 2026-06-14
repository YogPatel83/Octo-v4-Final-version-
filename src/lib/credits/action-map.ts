export function getCreditActionForSource(input: {
  source_table: string;
  action?: string | null;
  type?: string | null;
}) {
  if (input.source_table === "ai_generations") {
    if (input.action === "image" || input.type === "image") return "image_generation";
    if (input.action === "video" || input.type === "video") return "video_generation";
    if (input.action === "tts" || input.type === "tts") return "tts_generation";
    if (input.action === "stt" || input.type === "stt") return "stt_generation";
    if (input.action === "music" || input.type === "music") return "music_generation";
    if (input.action === "three_d" || input.type === "three_d") return "three_d_generation";
  }

  if (input.source_table === "external_api_requests") {
    return "external_api_action";
  }

  if (input.source_table === "tasks") {
    return "agent_run";
  }

  return "chat_message";
}
