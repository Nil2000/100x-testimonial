"use client";
import Loading from "@/components/loader";
import axios from "axios";
import React from "react";
import HorizontalTabs from "./horizontal-tabs";

export default function SpacePage({ id }: { id: string }) {
  const [isMounted, setIsMounted] = React.useState(false);
  const [spaceInfo, setSpaceInfo] = React.useState<any | null>(null);
  const fetchSpaceInfo = async () => {
    axios.get(`/api/spaces/${id}`).then((res) => {
      console.log(res.data);
      setSpaceInfo(res.data);
      setIsMounted(true);
    });
  };

  React.useEffect(() => {
    fetchSpaceInfo();
  }, []);

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="px-2 h-full">
      <HorizontalTabs spaceInfo={spaceInfo} />
    </div>
  );
}
