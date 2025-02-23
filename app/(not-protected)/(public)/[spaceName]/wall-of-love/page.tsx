import { getTestimonialsForWallOfLove } from "@/actions/spaceActions";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import BackgroundImage from "./_components/background-image";
import WallOfLoveCard from "./_components/wall-of-love-card";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string }>;
}) {
  const { spaceName } = await params;

  const response = await getTestimonialsForWallOfLove(spaceName);

  if (response.error) notFound();

  return (
    <div className="lg:max-w-[1000px] mx-auto py-8 w-full">
      <BackgroundImage />
      <div className="flex flex-col items-center justify-end sm:h-[35vh] gap-4">
        <h2 className="text-5xl font-dm_serif">Wall of love: {spaceName}</h2>
        <h4 className="font-poppins w-3/4 text-center text-white/70 text-pretty">
          A collection of heartfelt testimonials from our amazing community,
          sharing their experiences and appreciation. Thank you for your
          support!
        </h4>
      </div>
      <div className="flex flex-col items-center gap-4 mt-3 px-4">
        {response.data?.map((testimonial) => (
          <WallOfLoveCard testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
