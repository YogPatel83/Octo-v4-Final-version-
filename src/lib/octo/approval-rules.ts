export const HIGH_RISK_APPROVAL_TYPES = [
  "spending_money",
  "signing_contract",
  "legal_decision",
  "supplier_commitment",
  "final_business_decision",
  "external_payment",
  "hiring_decision",
  "firing_decision",
];

export function requiresHumanApproval(type: string) {
  return HIGH_RISK_APPROVAL_TYPES.includes(type);
}
