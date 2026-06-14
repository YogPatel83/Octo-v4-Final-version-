export function createContextualQuestions(input: {
  objective: string;
  mode?: "builder" | "build_lab" | "marketing" | "general";
}) {
  const objective = input.objective.toLowerCase();
  const questions: string[] = [];
  const detected: string[] = [];

  if (
    objective.includes("clone") ||
    objective.includes("terminal") ||
    objective.includes("bloomberg") ||
    objective.includes("saas") ||
    objective.includes("app") ||
    objective.includes("website") ||
    objective.includes("software")
  ) {
    detected.push("software_build");

    questions.push(
      "Should Octo build the fastest MVP first, the lowest-cost version, or the closest full-feature version?",
      "Do you want to upload a template, reference website, screenshot, or example app for Octo to follow?",
      "Should Octo create only a preview first, without deploying publicly?",
      "Should Octo generate Supabase tables and SQL, but wait for your approval before applying them?",
      "Should Octo create a GitHub pull request instead of pushing directly?",
      "Which pages must exist in version one?",
      "Which features are absolutely required for the MVP?",
      "Should the product use platform AI keys, your own API keys, or local/self-hosted models?"
    );
  }

  if (
    objective.includes("market") ||
    objective.includes("ads") ||
    objective.includes("launch") ||
    objective.includes("instagram") ||
    objective.includes("twitter") ||
    objective.includes("linkedin")
  ) {
    detected.push("marketing");

    questions.push(
      "Which channel should Octo prioritize first: Instagram, Twitter/X, LinkedIn, Google Ads, Meta Ads, or email?",
      "Should Octo only draft campaigns, or also request approval to publish them?",
      "What budget limit should Octo never cross without approval?",
      "Should Octo create brand rules before generating ads?"
    );
  }

  if (
    objective.includes("supplier") ||
    objective.includes("vendor") ||
    objective.includes("source") ||
    objective.includes("parts") ||
    objective.includes("manufacturing")
  ) {
    detected.push("supplier_ops");

    questions.push(
      "Which country or region should Octo search suppliers in first?",
      "Should Octo contact suppliers through email, WhatsApp, Instagram, or another channel?",
      "Should supplier messages always require approval before sending?",
      "What price, MOQ, delivery, or quality constraints should Octo use?"
    );
  }

  if (
    objective.includes("finance") ||
    objective.includes("budget") ||
    objective.includes("revenue") ||
    objective.includes("pricing")
  ) {
    detected.push("finance");

    questions.push(
      "Should Octo optimize for profitability, growth, or lowest launch cost?",
      "What spending limit should require approval?",
      "Should Octo create finance reports automatically every week?"
    );
  }

  if (questions.length === 0) {
    questions.push(
      "Should Octo optimize for fastest launch, lowest cost, best quality, or highest revenue potential?",
      "Should Octo ask before taking external actions like sending messages, publishing, deploying, or spending money?",
      "Do you want Octo to generate a full plan first or start with a small MVP?",
      "Which apps, API keys, or files should Octo use?"
    );
  }

  return {
    objective: input.objective,
    mode: input.mode || "general",
    detected,
    questions: [...new Set(questions)],
    approval_rules: [
      "Final business decisions must be made by a human.",
      "Spending money requires human approval.",
      "Public deployment requires human approval.",
      "Domain purchase or connection requires human approval.",
      "Contracts and legal decisions require human approval.",
      "External messages can require approval based on workspace rules.",
    ],
  };
}
