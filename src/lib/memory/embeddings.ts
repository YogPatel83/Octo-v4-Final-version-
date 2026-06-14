import OpenAI from "openai";

export async function createEmbedding(text: string) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return {
      embedding: [],
      provider: "openai",
      model: "text-embedding-3-small",
      warning: "OPENAI_API_KEY missing. Embedding not created.",
    };
  }

  const client = new OpenAI({ apiKey });

  const response = await client.embeddings.create({
    model: "text-embedding-3-small",
    input: text,
  });

  return {
    embedding: response.data[0].embedding,
    provider: "openai",
    model: "text-embedding-3-small",
  };
}
