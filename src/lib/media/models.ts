export const MEDIA_MODELS = {
  image: [
    {
      provider: "google",
      model: "gemini-image",
      env: "GOOGLE_GENERATIVE_AI_API_KEY"
    },
    {
      provider: "openai",
      model: "gpt-image",
      env: "OPENAI_API_KEY"
    },
    {
      provider: "higgsfield",
      model: "higgsfield-image",
      env: "HIGGSFIELD_API_KEY"
    }
  ],
  video: [
    {
      provider: "google",
      model: "veo",
      env: "GOOGLE_GENERATIVE_AI_API_KEY"
    },
    {
      provider: "google",
      model: "omni",
      env: "GOOGLE_GENERATIVE_AI_API_KEY"
    },
    {
      provider: "higgsfield",
      model: "higgsfield-video",
      env: "HIGGSFIELD_API_KEY"
    }
  ]
};
