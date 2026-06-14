export const CREDIT_COSTS = {
  chat_message: 1,

  agent_run_platform: 5,
  agent_run_byok: 2,

  workflow_run_platform: 15,
  workflow_run_byok: 6,

  swarm_run_platform: 30,
  swarm_run_byok: 12,

  image_generation_platform: 50,
  image_generation_byok: 10,

  video_generation_platform: 300,
  video_generation_byok: 60,

  tts_generation_platform: 40,
  tts_generation_byok: 8,

  stt_generation_platform: 20,
  stt_generation_byok: 4,

  music_generation_platform: 100,
  music_generation_byok: 20,

  three_d_generation_platform: 150,
  three_d_generation_byok: 30,

  file_ingestion: 20,

  external_api_action_platform: 10,
  external_api_action_byok: 3,

  autopilot_cycle: 100,
  scheduler_cycle: 25,
} as const;

export type CreditAction = keyof typeof CREDIT_COSTS;

export function getCreditCost(action: string, byokUsed = false) {
  const normalized = action as CreditAction;

  if (CREDIT_COSTS[normalized]) {
    return CREDIT_COSTS[normalized];
  }

  if (action === "agent_run") {
    return byokUsed ? CREDIT_COSTS.agent_run_byok : CREDIT_COSTS.agent_run_platform;
  }

  if (action === "workflow_run") {
    return byokUsed ? CREDIT_COSTS.workflow_run_byok : CREDIT_COSTS.workflow_run_platform;
  }

  if (action === "swarm_run") {
    return byokUsed ? CREDIT_COSTS.swarm_run_byok : CREDIT_COSTS.swarm_run_platform;
  }

  if (action === "image_generation") {
    return byokUsed ? CREDIT_COSTS.image_generation_byok : CREDIT_COSTS.image_generation_platform;
  }

  if (action === "video_generation") {
    return byokUsed ? CREDIT_COSTS.video_generation_byok : CREDIT_COSTS.video_generation_platform;
  }

  if (action === "external_api_action") {
    return byokUsed ? CREDIT_COSTS.external_api_action_byok : CREDIT_COSTS.external_api_action_platform;
  }

  return byokUsed ? 1 : 5;
}
