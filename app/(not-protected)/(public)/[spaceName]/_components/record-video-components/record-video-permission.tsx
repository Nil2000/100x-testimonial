"use client";
import Loading from "@/components/loader";
import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { div } from "motion/react-client";
import React from "react";

type Props = {
  videoRef: React.RefObject<HTMLVideoElement | null>;
  permissionEnabled: boolean;
  checkingPermission: boolean;
};

export default function RecordVideoPermissions({
  videoRef,
  permissionEnabled,
  checkingPermission,
}: Props) {
  return (
    <div className="flex flex-col gap-4 py-6">
      <DialogHeader className="w-full flex items-center">
        <DialogTitle className="font-medium text-xl">
          Check your camera and microphone
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <p className="text-muted-foreground text-sm text-center">
        You have up to 120 seconds to record your video. Don’t worry: You can
        review your video before submitting it, and you can re-record if needed.
      </p>
      {checkingPermission && (
        <>
          <Button>
            <Loading />
          </Button>
          {/* <Button onClick={checkPermission} id="special_button_video_record">
            Try again
          </Button> */}
        </>
      )}
      {!checkingPermission && !permissionEnabled && (
        <>
          <p className="text-destructive text-center">
            You may have denied camera & microphone access, if so you will have
            to allow access in browser settings. However, you can still choose a
            file to upload.
          </p>
          <Button onClick={() => {}}>Upload recorded file</Button>
        </>
      )}
      {!checkingPermission && permissionEnabled && (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          <Button>Start recording</Button>
        </>
      )}
    </div>
  );
}
