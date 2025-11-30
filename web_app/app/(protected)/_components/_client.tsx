"use client";
import React from "react";
import SmallCardWrapper from "./overview-card-wrapper";
import { FolderOpen, Luggage, PlusIcon, Sparkles } from "lucide-react";
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
        console.log(res.data);
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
    <div className="flex flex-col gap-8 p-4 md:p-6 max-w-7xl mx-auto w-full">
      {/* Header Section */}
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your testimonial spaces and track your progress.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
        <SmallCardWrapper
          smallText="Total Spaces"
          largeText={`${spaces.length}`}
          subText="of 2 available"
          icon={Sparkles}
          variant="default"
        />
        <SmallCardWrapper
          smallText="Current Plan"
          largeText="Starter"
          subText="Free tier"
          icon={Luggage}
          enableButton
          variant="premium"
        />
      </div>

      {/* Spaces Section */}
      <div className="flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Your Spaces
            </h2>
            <p className="text-sm text-muted-foreground">
              Create and manage your testimonial collection spaces.
            </p>
          </div>
          <Link href="/dashboard/spaces/create">
            <Button className="gap-2 shadow-sm">
              <PlusIcon size={16} strokeWidth={2} />
              Create Space
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <LoadingSpaceCard />
            <LoadingSpaceCard />
            <LoadingSpaceCard />
          </div>
        ) : spaces.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                id={space.id}
                name={space.name}
                imgUrl={
                  space.logo ||
                  "https://media.istockphoto.com/id/1147544807/vector/thumbnail-image-vector-graphic.jpg?s=612x612&w=0&k=20&c=rnCKVbdxqkjlcs3xH87-9gocETqpspHFXu5dIGB4wuM="
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed rounded-xl bg-muted/30">
            <div className="rounded-full bg-muted p-4 mb-4">
              <FolderOpen className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No spaces yet</h3>
            <p className="text-sm text-muted-foreground text-center mb-4 max-w-sm">
              Create your first space to start collecting testimonials from your
              customers.
            </p>
            <Link href="/dashboard/spaces/create">
              <Button className="gap-2">
                <PlusIcon size={16} />
                Create Your First Space
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
