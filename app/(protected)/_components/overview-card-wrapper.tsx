import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SmallCardWrapper({
  smallText,
  largeText,
  icon: IconComponent,
  enableButton,
}: {
  smallText: string;
  largeText: string;
  icon: LucideIcon;
  enableButton?: boolean;
}) {
  return (
    <Card className="bg-secondary border border-foreground/10 p-3 flex justify-between rounded-md">
      <div className="flex flex-col gap-2">
        <h2>{smallText}</h2>
        <h1 className="text-2xl">{largeText}</h1>
      </div>
      <div className="flex flex-col items-end gap-2">
        <IconComponent className="text-foreground/70" />
        {enableButton && (
          <Link href="/buy-premium">
            <Button className="flex">✨Upgrade</Button>
          </Link>
        )}
      </div>
    </Card>
  );
}
