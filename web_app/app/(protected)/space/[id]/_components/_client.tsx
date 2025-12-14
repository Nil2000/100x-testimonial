"use client";
import axios from "axios";
import React from "react";
import HorizontalTabs from "./horizontal-tabs";
import { useSpaceStore } from "@/store/spaceStore";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ChevronRight, Globe, GlobeLock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SpacePage({ id }: { id: string }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { spaceInfo, setSpaceInfo } = useSpaceStore();

  const fetchSpaceInfo = async () => {
    try {
      const res = await axios.get(`/api/space/${id}`);
      setSpaceInfo(res.data.space);
    } catch (error) {
      console.error("Failed to fetch space info", error);
      setError("Failed to load space. Please try again.");
    }
    setIsMounted(true);
  };

  React.useEffect(() => {
    fetchSpaceInfo();
  }, []);

  if (!isMounted) {
    return (
      <div className="p-4 md:p-6 space-y-6 animate-in fade-in duration-300">
        {/* Header skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-6 w-20 rounded-full" />
        </div>
        {/* Tabs skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-28 rounded-t-lg" />
          <Skeleton className="h-10 w-40 rounded-t-lg" />
          <Skeleton className="h-10 w-32 rounded-t-lg" />
        </div>
        {/* Content skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Skeleton className="h-10 w-full" />
          <div className="md:col-span-3 space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <div className="text-destructive text-lg font-medium">{error}</div>
        <button
          onClick={() => {
            setError(null);
            setIsMounted(false);
            fetchSpaceInfo();
          }}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 h-full space-y-4 animate-in fade-in duration-300">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Space Logo */}
          {spaceInfo.logo ? (
            <div className="relative h-12 w-12 rounded-lg overflow-hidden border bg-muted flex-shrink-0">
              <Image
                src={spaceInfo.logo}
                alt={spaceInfo.name}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-12 w-12 rounded-lg bg-gradient-to-br from-primary/20 to-primary/5 border flex items-center justify-center flex-shrink-0">
              <span className="text-xl font-bold text-primary">
                {spaceInfo.name?.charAt(0)?.toUpperCase() || "S"}
              </span>
            </div>
          )}
          <div className="min-w-0">
            {/* Breadcrumb */}
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-0.5">
              <Link
                href="/dashboard"
                className="hover:text-foreground transition-colors"
              >
                Dashboard
              </Link>
              <ChevronRight className="h-3 w-3" />
              <span className="truncate">Spaces</span>
            </div>
            {/* Space Name */}
            <h1 className="text-xl font-semibold truncate">
              {spaceInfo.name || "Untitled Space"}
            </h1>
          </div>
        </div>
        {/* Status Badge */}
        <Badge
          variant={spaceInfo.isPublished ? "default" : "secondary"}
          className="flex items-center gap-1.5 px-3 py-1 self-start sm:self-center"
        >
          {spaceInfo.isPublished ? (
            <>
              <Globe className="h-3.5 w-3.5" />
              <span>Published</span>
            </>
          ) : (
            <>
              <GlobeLock className="h-3.5 w-3.5" />
              <span>Draft</span>
            </>
          )}
        </Badge>
      </div>

      {/* Main Content */}
      <HorizontalTabs />
    </div>
  );
}
