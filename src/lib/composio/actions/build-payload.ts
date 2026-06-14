export function buildComposioPayload(input: {
  tool: string;
  action: string;
  payload: Record<string, unknown>;
}) {
  return input.payload || {};
}
