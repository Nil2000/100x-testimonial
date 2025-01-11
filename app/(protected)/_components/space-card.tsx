import { Card } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function SpaceCard({
  name,
  imgUrl,
}: {
  name: string;
  imgUrl: string;
}) {
  return (
    <Card className="h-[150px] md:w-[300px] w-full flex rounded-lg hover:bg-foreground/5">
      <Image
        src={imgUrl}
        alt={name}
        width={150}
        height={150}
        className="object-cover rounded-lg rounded-r-3xl"
      />
      <div className="h-full w-full flex items-center justify-center">
        <h2>{name}</h2>
      </div>
    </Card>
  );
}
