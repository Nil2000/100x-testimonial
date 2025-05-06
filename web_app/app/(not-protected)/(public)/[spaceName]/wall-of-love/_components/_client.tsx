"use client";
import React from "react";
import BackgroundImage from "./background-image";
import TestimonialsList from "./testimonials-list";
import WallOfLoveFooter from "./wall-of-love-footer";
import { useMetrics } from "@/hooks/use-metrics";
import { createId } from "@paralleldrive/cuid2";
import { METRIC_PAGE } from "@/lib/constants";

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

  React.useEffect(() => {
    const startTime = Date.now();

    async function init() {
      const visitorData = JSON.parse(
        localStorage.getItem("visitorData") || "{}"
      );
      const pageKey = METRIC_PAGE.WALL_PAGE;

      if (!visitorData[spaceId]) {
        visitorData[spaceId] = {};
      }

      const visitorId = visitorData[spaceId][pageKey];

      if (!visitorId) {
        const newVisitorId = createId();
        visitorData[spaceId][pageKey] = newVisitorId;
        localStorage.setItem("visitorData", JSON.stringify(visitorData));
        await trackUniqueVisitor(spaceId, pageKey);
      }
      await trackPageView(spaceId, pageKey);
    }

    init();

    const handleBeforeUnload = async () => {
      const endTime = Date.now();
      const timeSpent = Math.floor((endTime - startTime) / 1000);
      if (timeSpent > 0) {
        await trackTimeSpent(spaceId, METRIC_PAGE.WALL_PAGE, timeSpent);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      handleBeforeUnload();
    };
  }, [spaceId, trackPageView, trackUniqueVisitor, trackTimeSpent]);

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
