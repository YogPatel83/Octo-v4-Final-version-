export function runComplianceCheck(input: {
  company_id: string;
  action_type: string;
  region?: string;
}) {
  const flags = [];

  if (["legal", "contract", "payment", "supplier_commitment"].includes(input.action_type)) {
    flags.push("human_approval_required");
  }

  if (input.region && !["IN", "US", "EU", "GLOBAL"].includes(input.region)) {
    flags.push("unsupported_region_review_required");
  }

  return {
    company_id: input.company_id,
    action_type: input.action_type,
    region: input.region || "GLOBAL",
    compliant: flags.length === 0,
    flags,
  };
}
