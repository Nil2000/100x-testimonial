import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSpaceCard() {
  return (
    <Card className="h-[140px] w-full flex rounded-xl border items-center p-4 gap-4">
      <Skeleton className="h-20 w-20 rounded-lg flex-shrink-0" />
      <div className="flex flex-col gap-2 flex-1">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
      <Skeleton className="h-8 w-8 rounded-full" />
    </Card>
  );
}
