import { NextResponse } from "next/server";
import { generateMissingResources } from "@/lib/evolution/create-missing-resources";

export async function POST() {
  const resources =
    generateMissingResources();

  return NextResponse.json({
    resources
  });
}
