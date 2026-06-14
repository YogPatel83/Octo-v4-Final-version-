export function createWorkforce(input: {
  company_id: string;
  objective: string;
}) {
  return {
    company_id: input.company_id,
    objective: input.objective,
    departments: [
      {
        name: "Executive",
        agents: ["CEO Agent"]
      },
      {
        name: "Operations",
        agents: ["Operations Manager", "Operations Worker"]
      },
      {
        name: "Finance",
        agents: ["Finance Manager", "Finance Worker"]
      },
      {
        name: "Marketing",
        agents: ["Marketing Manager", "Marketing Worker"]
      },
      {
        name: "Customer Support",
        agents: ["Support Manager", "Support Worker"]
      }
    ]
  };
}
