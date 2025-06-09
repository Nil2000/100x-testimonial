"use client";
import React from "react";
import SmallCardWrapper from "./overview-card-wrapper";
import { Luggage, PlusIcon, Sparkles, Video } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LoadingSpaceCard from "./loading-space-card-wrapper";
import SpaceCard from "./space-card";
import axios from "axios";

interface Space {
  id: string;
  name: string;
  logo: string | null;
}

export default function DashboardPage() {
  const [spaces, setSpaces] = React.useState<Space[]>([]);
  const [loading, setLoading] = React.useState(true);

  const fetchSpaces = async () => {
    axios
      .get("/api/spaces")
      .then((res) => {
        setSpaces(res.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchSpaces();
  }, []);
  return (
    <div className="flex flex-col gap-6 p-3">
      <h1 className="text-2xl font-bold">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SmallCardWrapper
          smallText="Total Spaces"
          largeText={`${spaces.length}/2`}
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
        {loading ? (
          <div className="w-full flex gap-4 flex-col md:flex-row md:flex-wrap">
            <LoadingSpaceCard />
            <LoadingSpaceCard />
            <LoadingSpaceCard />
          </div>
        ) : (
          <div className="w-full flex gap-4 flex-col md:flex-row md:flex-wrap">
            {spaces.map((space, index) => {
              return (
                <SpaceCard
                  key={index}
                  id={space.id}
                  name={space.name}
                  imgUrl={
                    space.logo ||
                    "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                  }
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
