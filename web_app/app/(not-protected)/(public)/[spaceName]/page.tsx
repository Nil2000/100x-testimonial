import React from "react";
import PublicSpaceView from "./_components/_client";
import { spaceExists } from "@/actions/spaceActions";
import { notFound } from "next/navigation";

export default async function page({
  params,
}: {
  params: Promise<{ spaceName: string }>;
}) {
  const { spaceName } = await params;

  const foundSpace = await spaceExists(spaceName);

  if (!foundSpace) {
    notFound();
  }
  return <PublicSpaceView space={foundSpace} />;
}
