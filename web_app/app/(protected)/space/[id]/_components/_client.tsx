"use client";
import Loading from "@/components/loader";
import axios from "axios";
import React from "react";
import HorizontalTabs from "./horizontal-tabs";
import { useSpaceStore } from "@/store/spaceStore";

export default function SpacePage({ id }: { id: string }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const { setSpaceInfo } = useSpaceStore();

  const fetchSpaceInfo = async () => {
    try {
      const res = await axios.get(`/api/space/${id}`);
      console.log("Space info", res.data);
      setSpaceInfo(res.data.space);
    } catch (error) {
      console.log("Failed to fetch space info", error);
    }
    setIsMounted(true);
  };

  React.useEffect(() => {
    fetchSpaceInfo();
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="p-2 h-full">
      <HorizontalTabs />
    </div>
  );
}
