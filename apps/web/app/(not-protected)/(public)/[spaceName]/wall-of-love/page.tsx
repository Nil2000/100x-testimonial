import { getTestimonialsForWallOfLove } from "@/actions/spaceActions";
import { notFound } from "next/navigation";
import React from "react";
import WallOfLovePage, {
  type WallOfLoveSpaceBranding,
} from "./_components/_client";
import { TestimonialResponse } from "@/lib/types";
import type { WallOfLoveSettings } from "@/lib/wall-of-love-settings";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string }>;
}) {
  const { spaceName } = await params;

  const response = await getTestimonialsForWallOfLove(spaceName);

  if ("error" in response) notFound();

  return (
    <WallOfLovePage
      spaceName={spaceName}
      testimonialList={response.data as TestimonialResponse[]}
      wallOfLoveSettings={response.wallOfLoveSettings as WallOfLoveSettings}
      space={response.space as WallOfLoveSpaceBranding}
    />
  );
}
