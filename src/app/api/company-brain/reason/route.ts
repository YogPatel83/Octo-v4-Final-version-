import { NextResponse } from "next/server";
import { reasonAboutCompany } from "@/lib/company-brain/reason";

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id || !body.question) {
    return NextResponse.json(
      { error: "company_id and question are required." },
      { status: 400 }
    );
  }

  const result = await reasonAboutCompany({
    company_id: body.company_id,
    question: body.question,
  });

  return NextResponse.json({ reasoning: result });
}
