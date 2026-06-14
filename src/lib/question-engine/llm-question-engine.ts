import { callAI } from "@/lib/ai/call-ai";

export async function generateLLMQuestions(input: {
  objective: string;
  company_context?: Record<string, unknown>;
  mode?: "builder" | "build_lab" | "chat" | "strategy";
}) {
  const prompt = `
You are Octo's question engine.

The user gave this objective:
"${input.objective}"

Your job:
Ask only the most useful questions before Octo creates or executes the plan.

Rules:
- Do not ask useless generic questions.
- Ask questions that reduce execution mistakes.
- Ask questions about budget, target customer, country, MVP scope, approvals, templates, APIs, deployment, legal risk, supplier risk, marketing channel, and timeline only when relevant.
- If the objective is simple, ask fewer questions.
- If the objective is risky, ask more questions.
- Always protect the rule: final business decisions are made by a human.
- Return JSON only.

Return this shape:
{
  "objective_type": "...",
  "risk_level": "low|medium|high|critical",
  "confidence": 0-100,
  "recommended_mode": "execute|ask_questions|planning|approval_required",
  "questions": [
    {
      "id": "q1",
      "question": "...",
      "reason": "...",
      "type": "single_choice|free_text|number|multi_choice",
      "options": []
    }
  ],
  "approval_rules": [],
  "next_step": "..."
}
`;

  const response = await callAI({
    provider: "openai",
    messages: [
      {
        role: "system",
        content: "You are a strict JSON generator for an AI operating system question engine.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  const raw = response.text || "{}";

  try {
    return JSON.parse(raw);
  } catch {
    return {
      objective_type: "unknown",
      risk_level: "medium",
      confidence: 50,
      recommended_mode: "ask_questions",
      questions: [
        {
          id: "q1",
          question: "Should Octo create a plan first before taking action?",
          reason: "The objective needs clarification before execution.",
          type: "single_choice",
          options: ["Yes, create a plan first", "No, execute immediately"],
        },
      ],
      approval_rules: [
        "Final business decisions must be made by a human.",
        "Spending money requires human approval.",
        "Public deployment requires human approval.",
      ],
      next_step: "answer_questions",
      raw_response: raw,
    };
  }
}
