const HIGH_RISK_WORDS = [
  "pay",
  "payment",
  "spend",
  "transfer",
  "contract",
  "legal",
  "lawsuit",
  "supplier commitment",
  "hire",
  "fire",
  "bank",
  "loan",
  "purchase",
  "invoice",
];

export function detectTaskRisk(title: string, input: unknown) {
  const haystack = `${title} ${JSON.stringify(input || {})}`.toLowerCase();

  const matched = HIGH_RISK_WORDS.filter((word) => haystack.includes(word));

  if (matched.length > 0) {
    return {
      risk_level: "high",
      requires_approval: true,
      reasons: matched,
    };
  }

  return {
    risk_level: "low",
    requires_approval: false,
    reasons: [],
  };
}
