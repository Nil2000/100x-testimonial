"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Video } from "lucide-react";
import React from "react";
import ChooseMethodOptionsDialog from "./record-video-components/choose-method-dialog-content";
import ChooseMethodOptionsDialogContent from "./record-video-components/choose-method-dialog-content";
import RecordVideoPermissions from "./record-video-components/record-video-permission";

const stepContent = [
  {
    content: <ChooseMethodOptionsDialogContent />,
  },
];

export default function RecordVideoDialog() {
  const [step, setStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          // Trigger stopTracks function when dialog closes
          setOpen(false);
        } else {
          setStep(0);
          setOpen(true);
        }
      }}
    >
      <DialogTrigger asChild className="w-full sm:max-w-40 group flex gap-1">
        <Button>
          <Video
            className="me-1 transition-transform group-hover:-translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
          <h2>Record a video</h2>
        </Button>
      </DialogTrigger>
      <DialogContent className="font-sans">
        {/* <ChooseMethodOptionsDialogContent /> */}
        <RecordVideoPermissions dialogStatus={open} />
      </DialogContent>
    </Dialog>
  );
}
