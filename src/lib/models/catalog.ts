export const MODEL_CATALOG = {
  text: [
    "openai:gpt-4.1",
    "anthropic:claude-sonnet-4-5",
    "google:gemini-2.5-pro",
    "grok:grok-2"
  ],
  image: [
    "openai:gpt-image-2",
    "google:gemini-2.5-flash-image",
    "google:imagen-4",
    "stability:stable-image",
    "higgsfield:higgsfield-image",
    "custom:custom-image"
  ],
  video: [
    "google:veo-3.1",
    "google:veo-3.1-fast",
    "higgsfield:higgsfield-video",
    "stability:stable-video",
    "custom:custom-video"
  ],
  tts: [
    "openai:gpt-4o-mini-tts",
    "elevenlabs:eleven-v3",
    "elevenlabs:multilingual-v2",
    "custom:custom-tts"
  ],
  stt: [
    "openai:gpt-4o-transcribe",
    "openai:gpt-4o-mini-transcribe",
    "openai:whisper-1",
    "elevenlabs:scribe-v2",
    "custom:custom-stt"
  ],
  music: [
    "elevenlabs:music",
    "custom:custom-music"
  ],
  three_d: [
    "stability:stable-fast-3d",
    "custom:custom-3d"
  ]
};
