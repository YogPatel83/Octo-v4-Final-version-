import { workforceStatus } from "@/lib/workforce/status";

export async function companyHealth(companyId: string) {
  const workforce = await workforceStatus(companyId);

  const score =
    Math.min(
      100,
      (workforce.agents * 5) +
      (workforce.teams * 10) +
      (workforce.workflows * 8)
    );

  return {
    company_id: companyId,
    health_score: score,
    status:
      score >= 80
        ? "excellent"
        : score >= 50
          ? "good"
          : "needs_improvement",
    workforce
  };
}
