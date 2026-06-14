export function calculateRevenueShare(input: {
  amount_cents: number;
}) {
  const platformFeePercent = 15;

  const platform_fee =
    Math.round(input.amount_cents * (platformFeePercent / 100));

  const seller_amount =
    input.amount_cents - platform_fee;

  return {
    amount_cents: input.amount_cents,
    platform_fee,
    seller_amount,
    platform_fee_percent: platformFeePercent,
  };
}
