import { recordDecisionMemory } from "./decision-memory";
import { recordIntelligenceEvent } from "./record-event";

export async function learnFromApproval(input: {
  company_id: string;
  approval_id: string;
  title?: string | null;
  decision: "approved" | "rejected";
  reason?: string | null;
  metadata?: Record<string, unknown>;
}) {
  await recordDecisionMemory({
    company_id: input.company_id,
    decision_type: `approval_${input.decision}`,
    user_choice: input.title || input.decision,
    rejected_choice: input.decision === "rejected" ? input.title || null : null,
    reason: input.reason || null,
    confidence: input.decision === "approved" ? 75 : 85,
    metadata: {
      approval_id: input.approval_id,
      ...(input.metadata || {}),
    },
  });

  return recordIntelligenceEvent({
    company_id: input.company_id,
    source_table: "approvals",
    source_id: input.approval_id,
    event_type: input.decision === "approved" ? "approval_learned" : "rejection_learned",
    title: input.title || `Approval ${input.decision}`,
    summary: input.reason || null,
    outcome: input.decision,
    importance: input.decision === "approved" ? 70 : 85,
    metadata: input.metadata || {},
  });
}
