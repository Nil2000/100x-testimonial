import React from "react";
import PublicSpaceView from "./_components/_client";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string }>;
}) {
  const { spaceName } = await params;
  return <PublicSpaceView spaceName={spaceName} />;
}
