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
import ThankYouDialog from "./thanks-dialog";
import { DialogDemo } from "./temp-dialog";
import { SpaceResponse } from "@/lib/types";
import RecordVideoDialog from "./record-video-dialog";

export default function PublicSpaceView({ spaceName }: { spaceName: string }) {
  const [loading, setIsLoading] = React.useState(true);
  const [openThanks, setOpenThanks] = React.useState(false);
  const [space, setSpace] = React.useState<SpaceResponse | null>(null);
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

  if (loading || !space) {
    return <LoadingPublicView />;
  }

  const showThanks = () => {
    setOpenThanks(true);
  };

  return (
    <div className="lg:max-w-[1000px] w-full px-4 flex flex-col justify-center mx-auto space-y-8 py-8">
      <div className="flex justify-center">
        <Image
          src={space.logoObjectKey}
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
      <ul className="sm:w-2/4 w-full mx-auto list-square list-inside">
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
          <RecordVideoDialog />
        )}
        {(space.collectionType === CollectionType.TEXT ||
          space.collectionType === CollectionType.TEXT_AND_VIDEO) && (
          <WriteTextDialog space={space} showThankYou={showThanks} />
        )}
        <ThankYouDialog
          open={openThanks}
          onOpenChange={() => {
            setOpenThanks(false);
          }}
          title={space.thankyouSpace.title}
          message={space.thankyouSpace.message}
        />
      </div>
    </div>
  );
}
