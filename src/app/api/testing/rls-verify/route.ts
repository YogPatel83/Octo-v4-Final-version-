import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    note: "RLS verification requires testing from frontend with a real Supabase user access token.",
    expected_header: "Authorization: Bearer <supabase_access_token>",
    manual_tests: [
      "User can read own profile",
      "User can read own companies",
      "User cannot read another owner's company",
      "User can read agents from own company",
      "User cannot read agents from another company",
      "User can create company as owner",
      "User can create agents only inside owned company"
    ],
  });
}
