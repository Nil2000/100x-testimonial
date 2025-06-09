"use client";
import React from "react";
import BackgroundImageContainer from "./background-image";
import TestimonialsList from "./testimonials-list";
import WallOfLoveFooter from "./wall-of-love-footer";
import { useMetrics } from "@/hooks/use-metrics";
import { createId } from "@paralleldrive/cuid2";
import { METRIC_PAGE } from "@/lib/constants";
import { usePostHog } from "posthog-js/react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

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
  return (
    <div className="lg:max-w-[1000px] mx-auto w-full">
      <BackgroundImageContainer>
        <div className="w-full flex flex-row justify-end">
          <Link href={"/"}>
            <Button className="top-0 right-0 z-10">
              Create yours <ArrowUpRight size={16} className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 h-[90%]">
          <h2 className="sm:text-5xl text-md font-dm_serif text-white">
            Wall of love for {spaceName}
          </h2>
        </div>
      </BackgroundImageContainer>
      <div className="flex flex-col items-center gap-4 px-4 mt-8 rounded-md">
        {testimonialList.length > 0 ? (
          <TestimonialsList testimonials={testimonialList} />
        ) : (
          <h4 className="font-poppins text-center text-white/70 text-pretty">
            No testimonials yet! Be the first to share your experience and make
            a difference in our community.
          </h4>
        )}
      </div>
      <WallOfLoveFooter spaceName={spaceName} />
    </div>
  );
}
