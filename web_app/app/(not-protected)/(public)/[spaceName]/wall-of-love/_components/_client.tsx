"use client";
import React from "react";
import BackgroundImage from "./background-image";
import TestimonialsList from "./testimonials-list";
import WallOfLoveFooter from "./wall-of-love-footer";
import { useMetrics } from "@/hooks/use-metrics";
import { createId } from "@paralleldrive/cuid2";
import { METRIC_PAGE } from "@/lib/constants";
import { usePostHog } from "posthog-js/react";
import { usePathname } from "next/navigation";

type Props = {
  spaceName: string;
  testimonialList: any;
  spaceId: string;
};

export default function WallOfLovePage({
  spaceName,
  testimonialList,
  spaceId,
}: Props) {
  const { trackPageView, trackUniqueVisitor, trackTimeSpent } = useMetrics();
  const posthog = usePostHog();
  const pathName = usePathname();

  React.useEffect(() => {
    if (pathName && posthog) {
      posthog.capture("$pageview", {
        $current_url: window.origin + pathName,
        spaceId,
      });
    }
  }, [spaceId]);

  return (
    <div className="lg:max-w-[1000px] mx-auto pt-8 w-full overflow-x-hidden">
      <BackgroundImage />
      <div className="flex flex-col items-center justify-end sm:h-[35vh] gap-4">
        <h2 className="text-5xl font-dm_serif">Wall of love: {spaceName}</h2>
        <h4 className="font-poppins w-3/4 text-center text-white/70 text-pretty">
          A collection of heartfelt testimonials from our amazing community,
          sharing their experiences and appreciation. Thank you for your
          support!
        </h4>
      </div>
      <div className="flex flex-col items-center gap-4 mt-8 px-4">
        {testimonialList.length > 0 ? (
          <TestimonialsList testimonials={testimonialList} />
        ) : (
          <h4 className="font-poppins text-center text-white/70 text-pretty">
            No testimonials yet! Be the first to share your experience and make
            a difference in our community.
          </h4>
        )}
      </div>
      <WallOfLoveFooter />
    </div>
  );
}
