import React from "react";
import DashboardPage from "../_components/_client";
import { auth } from "@/lib/auth";
import { getUserPlanInfo } from "@/lib/accessControl";
import { PLAN_LIMITS } from "@/lib/subscription";

export default async function page() {
  const session = await auth();
  
  let userPlan = "FREE";
  let spaceLimit = 1;
  let planInfo = null;

  if (session?.user?.id) {
    planInfo = await getUserPlanInfo(session.user.id);
    if (planInfo) {
      userPlan = planInfo.plan;
      const limits = PLAN_LIMITS[planInfo.plan as keyof typeof PLAN_LIMITS];
      if (limits) {
        spaceLimit = limits.spaces === -1 ? 999 : limits.spaces;
      }
    }
  }

  return (
    <DashboardPage 
      userPlan={userPlan}
      spaceLimit={spaceLimit}
      planInfo={planInfo}
    />
  );
}
