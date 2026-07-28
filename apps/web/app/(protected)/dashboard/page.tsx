import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/authGuards";
import { getUserPlanInfo } from "@/lib/accessControl";
import { PLAN_LIMITS } from "@/lib/subscription";
import DashboardPage from "../_components/_client";
import { getSpaces } from "@/actions/spaceActions";

export default async function Page() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    redirect("/auth/signin");
  }

  const [planInfo, spaces] = await Promise.all([
    getUserPlanInfo(authResult.userId),
    getSpaces(),
  ]);

  if (!planInfo) {
    redirect("/auth/signin");
  }

  if ("error" in spaces) {
    redirect("/auth/signin");
  }

  const userPlan = (planInfo.plan ?? "FREE") as keyof typeof PLAN_LIMITS;
  const limits = PLAN_LIMITS[userPlan];
  const spaceLimit = limits ? (limits.spaces === -1 ? 999 : limits.spaces) : 1;

  return (
    <DashboardPage
      userPlan={userPlan as string}
      spaceLimit={spaceLimit}
      spaces={spaces}
    />
  );
}
