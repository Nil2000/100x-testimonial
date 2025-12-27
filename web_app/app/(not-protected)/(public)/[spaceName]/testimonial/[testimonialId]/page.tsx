import { getFeedbackByIdAndSpaceNameWithSpaceLogo } from "@/actions/feedbackActions";
import { notFound } from "next/navigation";
import React from "react";
import TestimonialCard from "./_components/testimonial-card";
import { SingleTestimonialWithSpaceLogo } from "@/lib/types";
import { spaceExists } from "@/actions/spaceActions";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Link from "next/link";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string; testimonialId: string }>;
}) {
  const { spaceName, testimonialId } = await params;

  const spaceResponse = await spaceExists(spaceName);

  if (!spaceResponse) {
    return notFound();
  }

  const feedbackResponse = await getFeedbackByIdAndSpaceNameWithSpaceLogo(
    spaceName,
    testimonialId
  );

  if (!feedbackResponse) {
    return notFound();
  }

  return (
    <div className="lg:max-w-[1000px] mx-auto w-full overflow-x-hidden p-4 space-y-4 flex flex-col justify-center">
      <TestimonialCard
        testimonial={
          feedbackResponse as unknown as SingleTestimonialWithSpaceLogo
        }
      />
      <Link href={`/${spaceName}/wall-of-love`} className="w-max mx-auto">
        <Button variant={"outline"}>
          <Heart className="mr-2 fill-red-500 text-red-500" size={16} />
          Our Wall of Love
        </Button>
      </Link>
    </div>
  );
}
