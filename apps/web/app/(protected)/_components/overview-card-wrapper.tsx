import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SmallCardWrapperProps {
  smallText: string;
  largeText: string;
  subText?: string;
  icon: LucideIcon;
  enableButton?: boolean;
  variant?: "default" | "premium";
}

export default function SmallCardWrapper({
  smallText,
  largeText,
  subText,
  icon: IconComponent,
  enableButton,
  variant = "default",
}: SmallCardWrapperProps) {
  return (
    <Card
      className={cn(
        "relative overflow-hidden border p-5 flex justify-between rounded-xl transition-all duration-200 hover:shadow-md",
        variant === "premium" &&
          "bg-gradient-to-br from-amber-500/10 via-orange-500/5 to-transparent border-amber-500/20",
        variant === "default" &&
          "bg-gradient-to-br from-primary/5 via-primary/2 to-transparent"
      )}
    >
      <div className="flex flex-col gap-1 z-10">
        <span className="text-sm font-medium text-muted-foreground">
          {smallText}
        </span>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-bold tracking-tight">{largeText}</span>
          {subText && (
            <span className="text-sm text-muted-foreground">{subText}</span>
          )}
        </div>
        {enableButton && (
          <Link href="/buy-premium" className="mt-2">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-8 text-xs font-medium border-amber-500/30 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <span>✨</span>
              Upgrade Plan
              <ArrowUpRight size={12} />
            </Button>
          </Link>
        )}
      </div>
      <div className="flex flex-col items-end justify-start">
        <div
          className={cn(
            "rounded-xl p-2.5",
            variant === "premium" && "bg-amber-500/10",
            variant === "default" && "bg-primary/10"
          )}
        >
          <IconComponent
            className={cn(
              "h-5 w-5",
              variant === "premium" && "text-amber-600 dark:text-amber-400",
              variant === "default" && "text-primary"
            )}
          />
        </div>
      </div>
      {/* Decorative background element */}
      <div
        className={cn(
          "absolute -right-8 -bottom-8 h-32 w-32 rounded-full opacity-10",
          variant === "premium" && "bg-amber-500",
          variant === "default" && "bg-primary"
        )}
      />
    </Card>
  );
}
