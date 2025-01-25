import React from "react";
import SpacePage from "./_components/_client";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SpacePage id={id} />;
}
