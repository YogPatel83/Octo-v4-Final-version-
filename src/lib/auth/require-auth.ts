import { getAuthUserFromRequest } from "./get-auth-user";

export async function requireAuth(req: Request) {
  const result = await getAuthUserFromRequest(req);

  if (!result.user) {
    throw new Error(result.error || "Unauthorized.");
  }

  return result.user;
}
