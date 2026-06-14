export function buildUsefulQuestions(objective: string) {
  const text = objective.toLowerCase();

  const questions = [];

  if (text.includes("clone") || text.includes("terminal") || text.includes("bloomberg")) {
    questions.push(
      "Should Octo build a lighter MVP version first instead of a full enterprise product?",
      "Who is the first target user: retail investors, traders, analysts, funds, or businesses?",
      "Which 3 features matter most for the first version?",
      "Should Octo use a provided template/example, or generate the frontend from scratch?",
      "Should Octo create Supabase tables automatically after your approval?",
      "Should Octo create a private GitHub repository or use your existing repository?",
      "Should Octo only create a preview first, without deploying publicly?",
      "What brand direction do you want: premium finance, modern AI analyst, or simple trading dashboard?"
    );
  }

  if (questions.length === 0) {
    questions.push(
      "Should Octo optimize for fastest launch, lowest cost, best design, or deepest functionality?",
      "Should Octo generate everything from scratch or use a template/example you provide?",
      "Should Octo create a preview first before asking for approval to deploy?",
      "Which actions require your approval before Octo continues?"
    );
  }

  return questions;
}
