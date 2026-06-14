export function analyzeExecutionResults(input: {
  completed_tasks: number;
  failed_tasks: number;
  approvals_required: number;
}) {
  const total =
    input.completed_tasks +
    input.failed_tasks;

  const successRate =
    total === 0
      ? 0
      : input.completed_tasks / total;

  const recommendations = [];

  if (successRate < 0.6) {
    recommendations.push(
      "Improve prompts and execution planning."
    );
  }

  if (input.approvals_required > 20) {
    recommendations.push(
      "Reduce unnecessary approval bottlenecks."
    );
  }

  if (recommendations.length === 0) {
    recommendations.push(
      "Continue current operating model."
    );
  }

  return {
    success_rate: successRate,
    recommendations,
  };
}
