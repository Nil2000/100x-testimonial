import { getTestimonialsForWallOfLove } from "@/actions/spaceActions";
import { notFound } from "next/navigation";
import React from "react";
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
      wallOfLoveSettings={response.wallOfLoveSettings}
    />
  );
}
