"use client";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function SpaceCard({
  name,
  imgUrl,
  id,
}: {
  name: string;
  imgUrl: string;
  id: string;
}) {
  const router = useRouter();
  return (
    <Card
      className="h-[150px] md:w-[300px] w-full flex rounded-lg hover:bg-foreground/5 cursor-pointer items-center p-2"
      onClick={() => router.push(`/space/${id}`)}
    >
      <Image
        src={imgUrl}
        alt={name}
        width={100}
        height={100}
        className="object-contain rounded-lg h-30 w-30 shadow-lg border"
      />
      <div className="h-full w-full flex items-center justify-center">
        <h2>{name}</h2>
      </div>
    </Card>
  );
}
