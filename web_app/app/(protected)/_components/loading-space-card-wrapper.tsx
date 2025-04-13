import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function LoadingSpaceCard() {
  return (
    <Card className="h-[150px] md:w-[300px] w-full flex flex-col gap-3 p-3">
      <Skeleton className="h-4 w-36" />
      <Skeleton className="h-2 w-20" />
      <Skeleton className="h-2 w-28" />
      <Skeleton className="h-2 w-16" />
      <Skeleton className="h-1 w-10" />
    </Card>
  );
}
