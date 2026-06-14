import { NextResponse } from "next/server";
import { OCTO_BUILDER_SYSTEM_PROMPT } from "@/lib/ai/builder-prompt";
import { requireFields } from "@/lib/http/validate";

export async function POST(req: Request) {
  const body = await req.json();

  const validation = requireFields(body, ["objective"]);

  if (!validation.ok) {
    return NextResponse.json(
      { error: "Missing required fields.", missing: validation.missing },
      { status: 400 }
    );
  }

  return NextResponse.json({
    objective: body.objective,
    system_prompt: OCTO_BUILDER_SYSTEM_PROMPT,
    generated_plan: {
      company_objective: body.objective,
      required_agents: [
        "Operations Agent",
        "Finance Agent",
        "Marketing Agent",
        "Supplier Agent",
        "Customer Support Agent"
      ],
      required_teams: [
        "Business Operations Swarm",
        "Growth Swarm"
      ],
      required_workflows: [
        "Supplier follow-up workflow",
        "Ad campaign workflow",
        "Finance reporting workflow",
        "Customer support workflow"
      ],
      required_approvals: [
        "Spending money",
        "Signing contracts",
        "Legal decisions",
        "Supplier commitments",
        "Final business decisions"
      ]
    }
  });
}
