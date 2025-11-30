"use client";
import { Card } from "@/components/ui/card";
import { ArrowRight, ExternalLink } from "lucide-react";
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
      className="group relative h-[140px] w-full flex rounded-xl border bg-card hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 cursor-pointer items-center p-4 gap-4 transition-all duration-200"
      onClick={() => router.push(`/space/${id}`)}
    >
      <div className="relative h-20 w-20 flex-shrink-0">
        <Image
          src={imgUrl}
          alt={name}
          fill
          className="object-cover rounded-lg border shadow-sm"
        />
      </div>
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <h3 className="font-semibold text-base truncate">{name}</h3>
        <p className="text-xs text-muted-foreground">Click to manage space</p>
      </div>
      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-muted group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
        <ArrowRight className="h-4 w-4" />
      </div>
    </Card>
  );
}
