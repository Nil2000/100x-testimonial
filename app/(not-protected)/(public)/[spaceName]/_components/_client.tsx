"use client";

import Image from "next/image";
import React from "react";
import LoadingPublicView from "./loading-public-view";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PublicSpaceView({ spaceName }: { spaceName: string }) {
  const [loading, setIsLoading] = React.useState(false);
  const router = useRouter();

  const fetchSpaceInfo = async () => {
    try {
      const { data } = await axios.get(`/api/public-space/${spaceName}`);

      if (data.error) {
        console.error("Failed to fetch space info", data.error);
        router.push("/not-found");
      } else {
        console.log("Space info", data.space);
      }
    } catch (error) {
      console.error("Failed to fetch space info", error);
    }
    setIsLoading(true);
  };

  React.useEffect(() => {
    fetchSpaceInfo();
  }, []);

  if (!loading) {
    return <LoadingPublicView />;
  }

  return (
    <div className="lg:max-w-[1000px] w-full px-4 flex flex-col justify-center mx-auto">
      <div className="flex justify-center mt-8">
        <Image
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Public space"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <h1 className="text-3xl font-bold text-center mt-8">Public Space</h1>
      <p className="text-center mt-4">
        This is a public space. You can view this space without logging in.
      </p>
    </div>
  );
}
