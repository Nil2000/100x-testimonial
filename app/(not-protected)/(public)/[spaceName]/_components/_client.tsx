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
import { SpaceResponse } from "@/lib/types";
import RecordVideoDialog from "./record-video-dialog";
import MediaDialog from "./newvideo-dialog";
import FinalDialogComponent from "./final-dialog-choice";
import UploadFileDialog from "./upload-file-dialog";
import SubmitFeedbackDialog from "./submit-feedback-dialog";

type PublicSpaceViewProps = {
  space: SpaceResponse;
};

export default function PublicSpaceView({ space }: PublicSpaceViewProps) {
  // const [loading, setIsLoading] = React.useState(true);
  const [openThanks, setOpenThanks] = React.useState(false);
  const [openRecord, setOpenRecord] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openSubmitFeedback, setOpenSubmitFeedback] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [openCheckPermission, setOpenCheckPermission] = React.useState(false);
  const router = useRouter();

  // if (loading || !space) {
  //   return <LoadingPublicView />;
  // }

  const showThanks = () => {
    setOpenThanks(true);
  };

  const handleUplaodFile = () => {
    setOpenRecord(false);
    setOpenUpload(true);
  };

  return (
    <div className="lg:max-w-[1000px] w-full px-4 flex flex-col justify-center mx-auto space-y-8 py-8">
      <div className="flex justify-center">
        {space.logoObjectKey && (
          <Image
            src={space.logoObjectKey}
            alt="Public space"
            width={100}
            height={100}
            className="object-cover"
          />
        )}
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
          <>
            <Button onClick={() => setOpenRecord(true)} className="group">
              <Video
                className="me-1 transition-transform group-hover:-translate-x-0.5"
                size={16}
                strokeWidth={2}
                aria-hidden="true"
              />
              <h2>Record a video</h2>
            </Button>
            {/* <RecordVideoDialog
              open={openRecord}
              onClose={() => {
                setOpenRecord(false);
              }}
            /> */}
            {/* <MediaDialog
              isOpen={openRecord}
              onClose={() => setOpenRecord(false)}
            /> */}
            <FinalDialogComponent
              open={openRecord}
              onClose={() => setOpenRecord(false)}
              handleFileUpload={handleUplaodFile}
              onSubmitFeedback={(url: string) => {
                setVideoUrl(url);
                setOpenRecord(false);
                setOpenSubmitFeedback(true);
              }}
            />
          </>
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
          title={space.thankyouSpace!.title}
          message={space.thankyouSpace!.message}
        />
        {/* <Button
          onClick={() => {
            setOpenUpload(true);
          }}
        >
          Upload file
        </Button> */}
        <UploadFileDialog
          open={openUpload}
          onClose={() => {
            setOpenUpload(false);
          }}
        />
        <SubmitFeedbackDialog
          open={openSubmitFeedback}
          onClose={() => {
            setOpenSubmitFeedback(false);
          }}
          videoUrl={videoUrl}
        />
      </div>
    </div>
  );
}
