export function resolveDataResidency(input: {
  company_id: string;
  requested_region?: string;
}) {
  const region = input.requested_region || "GLOBAL";

  return {
    company_id: input.company_id,
    region,
    storage_policy:
      region === "EU"
        ? "eu_preferred"
        : region === "IN"
          ? "india_preferred"
          : "global_default",
    note: "Physical data residency enforcement depends on Supabase/Vercel/DigitalOcean region configuration.",
  };
}
