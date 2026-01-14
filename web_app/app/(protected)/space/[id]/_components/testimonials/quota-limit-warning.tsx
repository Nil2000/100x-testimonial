"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePlanStore } from "@/store/planStore";
import { PLAN_LIMITS } from "@/lib/subscription";

interface QuotaLimitWarningProps {
  currentCount: number;
  category: "text" | "video" | "all";
}

export default function QuotaLimitWarning({
  currentCount,
  category,
}: QuotaLimitWarningProps) {
  const { subscription } = usePlanStore();

  if (!subscription) {
    return null;
  }

  const plan = subscription.plan;
  const planLimits = PLAN_LIMITS[plan];

  let limit = 0;
  let limitType = "";
  let isOverLimit = false;

  if (category === "text") {
    limit = planLimits.textTestimonialsPerSpace;
    limitType = "text testimonials";
    isOverLimit = limit !== -1 && currentCount >= limit;
  } else if (category === "video") {
    limit = planLimits.videoFeedbacksPerSpace;
    limitType = "video testimonials";
    isOverLimit = limit !== -1 && currentCount >= limit;
  } else if (category === "all") {
    const textLimit = planLimits.textTestimonialsPerSpace;
    const videoLimit = planLimits.videoFeedbacksPerSpace;
    
    if (textLimit === -1 && videoLimit === -1) {
      return null;
    }

    const hasTextLimit = textLimit !== -1;
    const hasVideoLimit = videoLimit !== -1;

    if (hasTextLimit && hasVideoLimit) {
      limitType = `${textLimit} text and ${videoLimit} video testimonials`;
      return (
        <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
          <CardContent className="flex items-start gap-3 p-4">
            <div className="mt-0.5 rounded-full bg-amber-500/10 p-1.5">
              <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold text-amber-900 dark:text-amber-100">
                Plan Limits
              </div>
              <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
                Your <span className="font-semibold">{plan}</span> plan allows up
                to {textLimit} text testimonials and {videoLimit} video
                testimonials per space.
              </p>
              <Link href="/buy-premium" className="mt-3 inline-flex">
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
            </div>
          </CardContent>
        </Card>
      );
    } else if (hasTextLimit) {
      limitType = `${textLimit} text testimonials`;
    } else if (hasVideoLimit) {
      limitType = `${videoLimit} video testimonials`;
    }

    return (
      <Card className="border-amber-500/50 bg-amber-50 dark:bg-amber-950/20">
        <CardContent className="flex items-start gap-3 p-4">
          <div className="mt-0.5 rounded-full bg-amber-500/10 p-1.5">
            <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-500" />
          </div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-amber-900 dark:text-amber-100">
              Plan Limits
            </div>
            <p className="mt-1 text-sm text-amber-800 dark:text-amber-200">
              Your <span className="font-semibold">{plan}</span> plan allows up
              to {limitType} per space.
            </p>
            <Link href="/buy-premium" className="mt-3 inline-flex">
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
          </div>
        </CardContent>
      </Card>
    );
  }

  if (limit === -1) {
    return null;
  }

  if (!isOverLimit) {
    return null;
  }

  return (
    <Card className="border-red-500/50 bg-red-50 dark:bg-red-950/20">
      <CardContent className="flex items-start gap-3 p-4">
        <div className="mt-0.5 rounded-full bg-red-500/10 p-1.5">
          <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-500" />
        </div>
        <div className="flex-1">
          <div className="text-sm font-semibold text-red-900 dark:text-red-100">
            Quota Limit Reached
          </div>
          <p className="mt-1 text-sm text-red-800 dark:text-red-200">
            You have reached the maximum of{" "}
            <span className="font-semibold">
              {limit} {limitType}
            </span>{" "}
            allowed on your <span className="font-semibold">{plan}</span> plan.
            You currently have {currentCount} {limitType}.
          </p>
          <p className="mt-2 text-sm text-red-800 dark:text-red-200">
            Upgrade your plan to receive more testimonials.
          </p>
          <Link href="/buy-premium" className="mt-3 inline-flex">
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 h-8 text-xs font-medium border-red-500/30 hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
            >
              <span>✨</span>
              Upgrade Plan
              <ArrowUpRight size={12} />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
