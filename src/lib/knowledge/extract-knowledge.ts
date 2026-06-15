import { callAI } from "@/lib/ai/call-ai";

export async function extractKnowledgeFromText(input: {
  text: string;
  objective?: string | null;
}) {
  const trimmed = input.text.slice(0, 24000);

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content:
          "You extract reusable company knowledge from text. Return strict JSON only.",
      },
      {
        role: "user",
        content: `
Extract reusable company knowledge from this text.

Rules:
- Extract facts, rules, preferences, supplier information, customer information, brand rules, product rules, process rules, risks, and opportunities.
- Do not include useless generic text.
- Return JSON only.

Shape:
{
  "items": [
    {
      "knowledge_type": "brand|supplier|customer|product|finance|process|risk|market|general",
      "title": "...",
      "content": "...",
      "confidence": 0-100,
      "tags": []
    }
  ]
}

Objective:
${input.objective || "No objective provided"}

Text:
${trimmed}
`,
      },
    ],
  });

  const raw = response.content || '{"items":[]}';

  try {
    const parsed = JSON.parse(raw);
    return {
      items: Array.isArray(parsed.items) ? parsed.items : [],
      raw,
    };
  } catch {
    return {
      items: [],
      raw,
    };
  }
}
