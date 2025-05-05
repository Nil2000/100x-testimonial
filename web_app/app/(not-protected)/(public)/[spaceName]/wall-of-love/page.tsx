import { getTestimonialsForWallOfLove } from "@/actions/spaceActions";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import BackgroundImage from "./_components/background-image";
import WallOfLoveCard from "./_components/wall-of-love-card";
import TestimonialsList from "./_components/testimonials-list";
import WallOfLoveFooter from "./_components/wall-of-love-footer";
import WallOfLovePage from "./_components/_client";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string }>;
}) {
  const { spaceName } = await params;

  const response = await getTestimonialsForWallOfLove(spaceName);

  if (response.error) notFound();

  return (
    <WallOfLovePage
      spaceName={spaceName}
      testimonialList={response.data}
      spaceId={response.spaceId!}
    />
  );
}
