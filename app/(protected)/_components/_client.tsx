"use client";
import React from "react";
import SmallCardWrapper from "./overview-card-wrapper";
import { Luggage, PlusIcon, Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingSpaceCard from "./loading-space-card-wrapper";
import SpaceCard from "./space-card";

export default function DashboardPage() {
  const [spaces, setSpaces] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  return (
    <div className="flex flex-col gap-6 px-3">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmallCardWrapper
          smallText="Total Spaces"
          largeText="0/2"
          icon={Sparkles}
        />
        <SmallCardWrapper
          smallText="Current Plan"
          largeText="Starter"
          icon={Luggage}
          enableButton
        />
      </div>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Spaces</h1>
          <Link href={"/dashboard/spaces/create"}>
            <Button variant={"secondary"}>
              <PlusIcon
                className="-ms-1 me-2 opacity-60"
                size={16}
                strokeWidth={2}
              />
              <h2>Create Space</h2>
            </Button>
          </Link>
        </div>
        {/* {!loading && spaces.length == 0 && (
          <div className="h-[300px] bg-transparent border w-full rounded-lg flex flex-col justify-center items-center gap-5">
            <h2 className="italic text-foreground/30">No spaces created</h2>
            <Link href={"/dashboard/spaces/create"}>
              <Button>
                <PlusIcon
                  className="-ms-1 me-2 opacity-60"
                  size={16}
                  strokeWidth={2}
                />
                <h2>Create your First Space</h2>
              </Button>
            </Link>
          </div>
        )} */}
        {loading && (
          <div className="w-full flex gap-4 flex-col md:flex-row md:flex-wrap">
            <LoadingSpaceCard />
            <LoadingSpaceCard />
            <LoadingSpaceCard />
          </div>
        )}
        <div className="w-full flex gap-4 flex-col md:flex-row md:flex-wrap">
          <SpaceCard
            name="Space 1"
            imgUrl="https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
          />
        </div>
      </div>
    </div>
  );
}
