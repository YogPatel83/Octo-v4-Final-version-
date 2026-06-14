import { analyzeCompanyBrain } from "./analyze-company-brain";

export async function reasonAboutCompany(input: {
  company_id: string;
  question: string;
}) {
  const brain = await analyzeCompanyBrain(input.company_id);

  return {
    company_id: input.company_id,
    question: input.question,
    brain,
    reasoning: {
      summary: "Company reasoning generated from current operational state.",
      recommended_action:
        brain.brain_state.agents === 0
          ? "Create agents first."
          : brain.brain_state.teams === 0
            ? "Create teams to coordinate agents."
            : brain.brain_state.pending_approvals > 0
              ? "Resolve pending approvals."
              : "Continue autonomous execution.",
    },
  };
}
