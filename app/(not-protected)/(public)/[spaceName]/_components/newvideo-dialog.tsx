"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Upload, Video } from "lucide-react";

interface MediaDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type DialogStep = "selection" | "record" | "upload";

export default function MediaDialog({ isOpen, onClose }: MediaDialogProps) {
  const [currentStep, setCurrentStep] = useState<DialogStep>("selection");
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Reset dialog state when it opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep("selection");
      setError(null);
      setSelectedFile(null);
    }
  }, [isOpen]);

  // Handle media stream for recording
  useEffect(() => {
    let mediaStream: MediaStream | null = null;

    const startMedia = async () => {
      try {
        // Reset error state
        setError(null);

        // Request access to both camera and microphone
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        // Store the stream in state for cleanup
        setStream(mediaStream);

        // Set the stream as the source for the video element
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setError(
          "Could not access camera or microphone. Please check permissions."
        );
      }
    };

    if (isOpen && currentStep === "record") {
      startMedia();
    }

    // Cleanup function to stop all tracks when component unmounts or dialog closes
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
    };
  }, [isOpen, currentStep]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    }
  };

  const handleBackClick = () => {
    setCurrentStep("selection");
    setError(null);
    setSelectedFile(null);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "selection":
        return (
          <div className="flex flex-col space-y-4">
            <p className="text-center text-slate-600">
              Choose an option to continue:
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setCurrentStep("record")}
                className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <Video className="h-10 w-10 text-blue-600 mb-2" />
                <span className="font-medium text-blue-700">Record Video</span>
              </button>
              <button
                onClick={() => setCurrentStep("upload")}
                className="flex flex-col items-center justify-center p-6 bg-green-50 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
              >
                <Upload className="h-10 w-10 text-green-600 mb-2" />
                <span className="font-medium text-green-700">Upload Video</span>
              </button>
            </div>
          </div>
        );

      case "record":
        return (
          <div className="p-1">
            {error ? (
              <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4">
                {error}
              </div>
            ) : (
              <div className="aspect-video bg-gray-900 rounded-md overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <p className="mt-4 text-sm text-slate-500">
              This application needs access to your camera and microphone.
            </p>

            <button
              onClick={handleBackClick}
              className="mt-4 px-3 py-1 text-sm text-slate-600 hover:text-slate-800 flex items-center"
            >
              ← Back to options
            </button>
          </div>
        );

      case "upload":
        return (
          <div className="p-1">
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-8 text-center">
              {selectedFile ? (
                <div className="space-y-2">
                  <p className="text-green-600 font-medium">File selected:</p>
                  <p className="text-slate-700">{selectedFile.name}</p>
                  <p className="text-slate-500 text-sm">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  <button
                    onClick={() => {
                      setSelectedFile(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = "";
                      }
                    }}
                    className="px-3 py-1 bg-slate-200 text-slate-700 rounded hover:bg-slate-300 text-sm mt-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <>
                  <Upload className="h-10 w-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-600 mb-4">
                    Drag and drop a video file here, or click to select
                  </p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer inline-block"
                  >
                    Select Video
                  </label>
                </>
              )}
            </div>

            <button
              onClick={handleBackClick}
              className="mt-4 px-3 py-1 text-sm text-slate-600 hover:text-slate-800 flex items-center"
            >
              ← Back to options
            </button>
          </div>
        );
    }
  };

  const getDialogTitle = () => {
    switch (currentStep) {
      case "selection":
        return "Choose an Option";
      case "record":
        return "Record Video";
      case "upload":
        return "Upload Video";
      default:
        return "Media Dialog";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
        </DialogHeader>

        {renderStepContent()}

        <DialogFooter>
          {currentStep !== "selection" && (
            <button
              onClick={handleBackClick}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-md hover:bg-slate-300 transition-colors mr-2"
            >
              Back
            </button>
          )}
          <DialogClose asChild>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
              Close
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
