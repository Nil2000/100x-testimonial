"use client";

import Image from "next/image";
import React from "react";
import LoadingPublicView from "./loading-public-view";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CollectionType } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { Pen, PenLine, Video } from "lucide-react";
import WriteTextDialog from "./write-text-dialog";

export default function PublicSpaceView({ spaceName }: { spaceName: string }) {
  const [loading, setIsLoading] = React.useState(true);
  const [space, setSpace] = React.useState<any>(null);
  const router = useRouter();
  const fetchSpaceInfo = async () => {
    try {
      const { data } = await axios.get(`/api/public-space/${spaceName}`);
      console.log("Space info", data.space);
      setSpace(data.space);
    } catch (error) {
      console.error("Failed to fetch space info", error);
      router.push("/not-found");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSpaceInfo();
  }, [spaceName]);

  if (loading) {
    return <LoadingPublicView />;
  }

  return (
    <div className="lg:max-w-[1000px] w-full px-4 flex flex-col justify-center mx-auto space-y-8 py-8">
      <div className="flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Public space"
          width={100}
          height={100}
          className="object-cover"
        />
      </div>
      <h1 className="text-4xl font-bold text-center">{space.headerTitle}</h1>
      <p className="text-center text-xl text-muted-foreground">
        {space.headerSubtitle}
      </p>
      <ul className="w-3/4 mx-auto list-square list-inside">
        <h2 className="uppercase font-semibold leading-6 mb-4">Questions</h2>
        {space.questions.map((question: any) => (
          <li key={question.id} className="text-muted-foreground">
            {question.title}
          </li>
        ))}
      </ul>
      <div className="flex justify-center space-x-2">
        {(space.collectionType === CollectionType.VIDEO ||
          space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
          <Button className="w-full sm:max-w-40 group flex gap-1">
            <Video
              className="me-1 transition-transform group-hover:-translate-x-0.5"
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            <h2>Record a video</h2>
          </Button>
        )}
        {(space.collectionType === CollectionType.TEXT ||
          space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
          <WriteTextDialog space={space} />
        )}
      </div>
    </div>
  );
}
