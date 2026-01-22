"use client";
import React from "react";
import SmallCardWrapper from "./overview-card-wrapper";
import { FolderOpen, Luggage, PlusIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoadingSpaceCard from "./loading-space-card-wrapper";
import SpaceCard from "./space-card";
import UpgradeDialog from "@/components/upgrade-dialog";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Space {
  id: string;
  name: string;
  logo: string | null;
}

interface DashboardPageProps {
  userPlan: string;
  spaceLimit: number;
}

export default function DashboardPage({ userPlan, spaceLimit }: DashboardPageProps) {
  const router = useRouter();
  const [spaces, setSpaces] = React.useState<Space[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showUpgradeDialog, setShowUpgradeDialog] = React.useState(false);

  const fetchSpaces = async () => {
    axios
      .get("/api/spaces")
      .then((res) => {
        // console.log(res.data);
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

  const handleCreateSpaceClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (spaces.length >= spaceLimit) {
      setShowUpgradeDialog(true);
      return;
    }

    router.push("/dashboard/spaces/create");
  };
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
          subText={`of ${
            spaceLimit === 999 ? "unlimited" : spaceLimit
          } available`}
          icon={Sparkles}
          variant="default"
        />
        <SmallCardWrapper
          smallText="Current Plan"
          largeText={
            userPlan === "FREE"
              ? "Starter"
              : userPlan === "TRIAL"
              ? "Trial"
              : userPlan
          }
          subText={
            userPlan === "FREE"
              ? "Free tier"
              : userPlan === "TRIAL"
              ? "7-day trial"
              : "Premium"
          }
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
          <Button className="gap-2 shadow-sm" onClick={handleCreateSpaceClick}>
            <PlusIcon size={16} strokeWidth={2} />
            Create Space
          </Button>
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
            <Button className="gap-2" onClick={handleCreateSpaceClick}>
              <PlusIcon size={16} />
              Create Your First Space
            </Button>
          </div>
        )}
      </div>

      <UpgradeDialog
        open={showUpgradeDialog}
        onOpenChange={setShowUpgradeDialog}
        title="Space Limit Reached"
        description={`You've reached the maximum of ${spaceLimit} space${
          spaceLimit > 1 ? "s" : ""
        } on your ${userPlan === "FREE" ? "free" : "current"} plan.`}
        feature="spaces"
        currentUsage={spaces.length}
        limit={spaceLimit}
      />
    </div>
  );
}
