import { getOwnedSpace } from "@/lib/authGuards";
import { auth } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import React from "react";
import SpacePage from "./_components/_client";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const space = await getOwnedSpace(session.user.id, id);
  if (!space) {
    notFound();
  }

  return <SpacePage id={id} />;
}
