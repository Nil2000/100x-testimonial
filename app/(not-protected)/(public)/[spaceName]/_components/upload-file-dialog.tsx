import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";

export default function UploadFileDialog({
  open,
  onClose,
  onSubmitFeedback,
}: {
  open: boolean;
  onClose: () => void;
  onSubmitFeedback: (uploadFile: Blob) => void;
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleSubmitFile(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      handleSubmitFile(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmitFile = (file: Blob) => {
    if (file) {
      // const url = URL.createObjectURL(file);
      onSubmitFeedback(file);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans">
        <DialogHeader className="flex flex-col items-center">
          <DialogTitle>Upload a video file</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="border-dashed border-2 border-gray-300 p-4 text-center h-52 flex flex-col justify-center items-center gap-4"
        >
          <p className="text-xs">
            Drag and drop a video file here, or click to select a file
          </p>
          <input
            type="file"
            accept="video/*"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
            ref={fileInputRef}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button onClick={handleButtonClick}>Upload File</Button>
          </label>
        </div>
      </DialogContent>
    </Dialog>
  );
}
