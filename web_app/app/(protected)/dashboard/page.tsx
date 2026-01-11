"use client";

import React from "react";
import DashboardPage from "../_components/_client";
import { usePlanStore } from "@/store/planStore";
import { PLAN_LIMITS } from "@/lib/subscription";

export default function Page() {
  const { subscription, loading, fetchSubscriptionDetails } = usePlanStore();

  React.useEffect(() => {
    if (!subscription && !loading) {
      fetchSubscriptionDetails();
    }
  }, [subscription, loading, fetchSubscriptionDetails]);

  const userPlan = subscription?.plan ?? "FREE";
  const limits = PLAN_LIMITS[userPlan as keyof typeof PLAN_LIMITS];
  const spaceLimit = limits ? (limits.spaces === -1 ? 999 : limits.spaces) : 1;

  return <DashboardPage userPlan={userPlan} spaceLimit={spaceLimit} />;
}
