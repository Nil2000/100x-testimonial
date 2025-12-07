"use client";
import React from "react";
import BackgroundImageContainer from "./background-image";
import TestimonialsList from "./testimonials-list";
import WallOfLoveFooter from "./wall-of-love-footer";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

type Props = {
  spaceName: string;
  testimonialList: any;
  spaceId: string;
  wallOfLoveSettings?: {
    style: string;
    styleOptions: {
      columns?: string;
      rows?: string;
      cardVariant?: string;
      showRating?: string;
      showDate?: string;
      gap?: string;
    };
  };
};

export default function WallOfLovePage({
  spaceName,
  testimonialList,
  spaceId,
  wallOfLoveSettings,
}: Props) {
  console.log(wallOfLoveSettings);
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
        <div className="flex flex-col items-center justify-center gap-4 h-[80%]">
          <h2 className="sm:text-7xl text-2xl font-dm_serif text-white font-bold">
            Wall of love : {spaceName}
          </h2>
        </div>
      </BackgroundImageContainer>
      <div className="flex flex-col items-center gap-4 px-4 mt-8 rounded-md">
        {testimonialList.length > 0 ? (
          <TestimonialsList
            testimonials={testimonialList}
            style={wallOfLoveSettings?.style}
            styleOptions={wallOfLoveSettings?.styleOptions}
          />
        ) : (
          <h4 className="font-poppins text-center text-white/70 text-pretty h-[40vh] flex flex-col items-center justify-center italic">
            No testimonials yet! Be the first to share your experience and make
            a difference in our community.
          </h4>
        )}
      </div>
      <WallOfLoveFooter spaceName={spaceName} />
    </div>
  );
}
