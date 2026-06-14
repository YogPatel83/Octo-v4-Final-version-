export function calculatePerformanceScore(input: {
  completed_tasks: number;
  failed_tasks: number;
  approval_blocks: number;
  average_roi_score?: number;
}) {
  const total = input.completed_tasks + input.failed_tasks;
  const successRate = total === 0 ? 0 : input.completed_tasks / total;
  const failurePenalty = input.failed_tasks * 8;
  const approvalPenalty = input.approval_blocks * 3;
  const roiBoost = input.average_roi_score || 0;

  const score = Math.max(
    0,
    Math.min(100, Math.round(successRate * 70 + roiBoost * 0.3 - failurePenalty - approvalPenalty))
  );

  return {
    score,
    success_rate: successRate,
    rating:
      score >= 85 ? "excellent" :
      score >= 70 ? "good" :
      score >= 50 ? "needs_review" :
      "poor",
  };
}
