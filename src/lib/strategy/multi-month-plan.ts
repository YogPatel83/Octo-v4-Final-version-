export function createMultiMonthPlan(input: {
  company_id: string;
  objective: string;
  months?: number;
}) {
  const months = input.months || 3;

  const plan = Array.from({ length: months }).map((_, index) => ({
    month: index + 1,
    focus:
      index === 0
        ? "Foundation and setup"
        : index === 1
          ? "Execution and optimization"
          : "Scale and automation",
    outcomes:
      index === 0
        ? ["Create agents", "Create swarms", "Create workflows"]
        : index === 1
          ? ["Run operations", "Measure ROI", "Fix failures"]
          : ["Scale systems", "Automate repeat work", "Improve memory"],
  }));

  return {
    company_id: input.company_id,
    objective: input.objective,
    months,
    plan,
  };
}
