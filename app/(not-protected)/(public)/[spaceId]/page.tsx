import React from "react";
import PublicSpaceView from "./_components/_client";

export default async function page({
  params,
}: {
  params: Promise<{ spaceId: string }>;
}) {
  const { spaceId } = await params;
  return <PublicSpaceView spaceId={spaceId} />;
}
