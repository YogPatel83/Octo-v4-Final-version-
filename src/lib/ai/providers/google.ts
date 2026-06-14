import { GoogleGenerativeAI } from "@google/generative-ai";
import { AICompletionInput, AICompletionOutput } from "./types";

export async function runGoogleCompletion(input: AICompletionInput): Promise<AICompletionOutput> {
  const apiKey = input.apiKeyOverride || process.env.GOOGLE_GENERATIVE_AI_API_KEY;

  if (!apiKey) {
    return {
      provider: "google",
      model: input.model,
      content: "Google Gemini key is missing. Add a platform key or agent BYOK key.",
    };
  }

  const client = new GoogleGenerativeAI(apiKey);
  const model = client.getGenerativeModel({ model: input.model });

  const prompt = input.messages
    .map((message) => `${message.role.toUpperCase()}: ${message.content}`)
    .join("\n\n");

  const response = await model.generateContent(prompt);

  return {
    provider: "google",
    model: input.model,
    content: response.response.text(),
    raw: response,
  };
}
