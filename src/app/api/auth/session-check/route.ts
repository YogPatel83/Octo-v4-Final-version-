import { NextResponse } from "next/server";
import { getAuthUserFromRequest } from "@/lib/auth/get-auth-user";

export async function GET(req: Request) {
  const result = await getAuthUserFromRequest(req);

  if (!result.user) {
    return NextResponse.json(
      {
        authenticated: false,
        error: result.error,
      },
      { status: 401 }
    );
  }

  return NextResponse.json({
    authenticated: true,
    user: {
      id: result.user.id,
      email: result.user.email,
    },
  });
}
