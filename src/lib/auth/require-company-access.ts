import { requireAuth } from "@/lib/auth/require-auth";
import { userCanAccessCompany } from "@/lib/company/access";

export async function requireCompanyAccess(req: Request, companyId: string) {
  const user = await requireAuth(req);

  const access = await userCanAccessCompany({
    user_id: user.id,
    company_id: companyId,
  });

  if (!access.allowed) {
    throw new Error("You do not have access to this company.");
  }

  return {
    user,
    access,
  };
}
