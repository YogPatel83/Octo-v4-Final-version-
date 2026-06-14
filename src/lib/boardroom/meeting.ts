export async function runBoardroomMeeting(input: {
  objective: string;
  executives: string[];
}) {
  const votes = input.executives.map(name => ({
    executive: name,
    recommendation: "approve",
    confidence: 80
  }));

  return {
    objective: input.objective,
    votes,
    final_recommendation: "approve"
  };
}
