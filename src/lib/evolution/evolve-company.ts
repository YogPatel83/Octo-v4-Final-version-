import { analyzeCompany } from "./analyze-company";
import { generateMissingResources } from "./create-missing-resources";

export async function evolveCompany(companyId: string) {
  const analysis =
    await analyzeCompany(companyId);

  const resources =
    generateMissingResources();

  return {
    company_id: companyId,
    analysis,
    proposed_changes: resources,
    mode: "proposal_only",
    note:
      "Real autonomous creation can be enabled later."
  };
}
