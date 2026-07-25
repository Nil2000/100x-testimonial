"use client";
import { usePlanStore } from '@/store/planStore';
import React from 'react'

export default function PlanHydrator(
  {children}: {children: React.ReactNode}
) {
  const planStore = usePlanStore();

  React.useEffect(() => {
    planStore.fetchSubscriptionDetails();
  }, []);

  return children;
}
