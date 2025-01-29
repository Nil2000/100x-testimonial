"use client";

import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingPublicView() {
  return (
    <div className="h-full space-y-8 flex flex-col items-center">
      <Skeleton className="h-[100px] w-[100px]" />
      <Skeleton className="h-8 w-64" />
      <Skeleton className="h-4 w-64" />
      <Skeleton className="h-4 w-64" />
    </div>
  );
}
