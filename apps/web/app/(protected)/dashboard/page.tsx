import { redirect } from "next/navigation";
import { requireAuth } from "@/lib/authGuards";
import { getUserPlanInfo } from "@/lib/accessControl";
import { PLAN_LIMITS, PlanType } from "@/lib/subscription";
import DashboardPage from "../_components/_client";
import { getSpaces } from "@/actions/spaceActions";

export default async function Page() {
  const authResult = await requireAuth();
  if ("error" in authResult) {
    redirect("/auth/signin");
  }

  const errors: string[] = [];
  let userPlan: PlanType = PlanType.FREE;
  let spaces: { id: string; name: string; logo: string | null }[] = [];

  try {
    const [planResult, spacesResult] = await Promise.all([
      getUserPlanInfo(authResult.userId),
      getSpaces(),
    ]);

    if ("error" in planResult) {
      errors.push(planResult.error);
    } else {
      userPlan = planResult.plan as PlanType;
    }

    if ("error" in spacesResult) {
      errors.push(spacesResult.error);
    } else {
      spaces = spacesResult;
    }
  } catch {
    errors.push("Failed to load dashboard data. Please try again.");
  }

  const limits = PLAN_LIMITS[userPlan];
  const spaceLimit = limits ? (limits.spaces === -1 ? 999 : limits.spaces) : 1;

  return (
    <DashboardPage
      userPlan={userPlan}
      spaceLimit={spaceLimit}
      spaces={spaces}
      errorMessage={errors.length > 0 ? errors.join(" ") : undefined}
    />
  );
}
