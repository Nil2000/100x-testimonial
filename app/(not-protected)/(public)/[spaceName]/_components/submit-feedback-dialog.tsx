import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";

export default function SubmitFeedbackDialog({
  open,
  onClose,
  videoUrl,
}: {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
}) {
  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans">
        <DialogHeader>
          <DialogTitle>Submit feedback</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center">
          <video src={videoUrl} controls className="w-full max-w-md"></video>
          <button
            onClick={() => {
              onClose();
            }}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
