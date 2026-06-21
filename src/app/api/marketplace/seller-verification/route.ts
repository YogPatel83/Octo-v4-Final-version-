import { NextResponse } from "next/server";
import {
  getSellerVerification,
  submitSellerVerification,
} from "@/lib/marketplace-completion/seller-verification";

export async function GET(req: Request) {
  const companyId = new URL(req.url).searchParams.get("company_id");

  if (!companyId) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const verification = await getSellerVerification(companyId);

  return NextResponse.json({ verification });
}

export async function POST(req: Request) {
  const body = await req.json();

  if (!body.company_id) {
    return NextResponse.json({ error: "company_id is required." }, { status: 400 });
  }

  const verification = await submitSellerVerification({
    company_id: body.company_id,
    user_id: body.user_id || null,
    seller_type: body.seller_type || "individual",
    legal_name: body.legal_name || null,
    business_name: body.business_name || null,
    country: body.country || null,
    submitted_data: body.submitted_data || {},
  });

  return NextResponse.json({ verification });
}
