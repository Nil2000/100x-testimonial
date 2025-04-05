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
import UploadFileDialog from "./upload-file-dialog";
import SubmitFeedbackDialog from "./submit-feedback-dialog";

type PublicSpaceViewProps = {
  space: SpaceResponse;
};

export default function PublicSpaceView({ space }: PublicSpaceViewProps) {
  const [openThanks, setOpenThanks] = React.useState(false);
  const [openRecord, setOpenRecord] = React.useState(false);
  const [openUpload, setOpenUpload] = React.useState(false);
  const [openSubmitFeedback, setOpenSubmitFeedback] = React.useState(false);
  const [videoFileBlob, setVideoFileBlob] = React.useState<Blob | null>(null);
  const [openCheckPermission, setOpenCheckPermission] = React.useState(false);
  const router = useRouter();

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
        {space.logo && (
          <Image
            src={space.logo}
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
            <RecordVideoDialog
              open={openRecord}
              onClose={() => setOpenRecord(false)}
              handleFileUpload={handleUplaodFile}
              onSubmitFeedback={(uploadFile: Blob) => {
                setVideoFileBlob(uploadFile);
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
        <UploadFileDialog
          open={openUpload}
          onClose={() => {
            setOpenUpload(false);
          }}
          onSubmitFeedback={(uploadFile: Blob) => {
            setVideoFileBlob(uploadFile);
            setOpenUpload(false);
            setOpenSubmitFeedback(true);
          }}
        />
        <SubmitFeedbackDialog
          open={openSubmitFeedback}
          onClose={() => {
            setOpenSubmitFeedback(false);
          }}
          videoFileBlob={videoFileBlob}
          retakeVideo={() => {
            setOpenRecord(true);
          }}
          spaceName={space.name}
          spaceId={space.id}
          showThankYou={showThanks}
        />
      </div>
    </div>
  );
}
