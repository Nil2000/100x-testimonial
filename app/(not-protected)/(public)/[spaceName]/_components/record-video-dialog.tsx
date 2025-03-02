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
import { StepType } from "@/lib/constants";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function RecordVideoDialog({ open, onClose }: Props) {
  const [currentStep, setCurrentStep] = React.useState("init");
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [stream, setStream] = React.useState<MediaStream | null>(null);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [permissionEnabled, setPermissionEnabled] = React.useState(false);
  const [checkingPermission, setCheckingPermission] = React.useState(true);

  React.useEffect(() => {
    if (open) {
      setCurrentStep("init");
      setSelectedFile(null);
    }
  }, [open]);

  React.useEffect(() => {
    let mediaStream: MediaStream | null = null;
    const startMedia = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setCheckingPermission(true);
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing media devices:", err);
        setCheckingPermission(false);
        setPermissionEnabled(false);
      }
    };

    if (open && currentStep === "check-permission") {
      startMedia();
    }
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      setStream(null);
    };
  }, [open, currentStep]);

  const handleStepChange = (step: StepType) => {
    setCurrentStep(step);
  };

  const renderStep = () => {
    switch (currentStep) {
      case "init":
        return <ChooseMethodOptionsDialog setStep={handleStepChange} />;
      case "check-permission":
        return (
          <RecordVideoPermissions
            checkingPermission={checkingPermission}
            permissionEnabled={permissionEnabled}
            videoRef={videoRef}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="font-sans">{renderStep()}</DialogContent>
    </Dialog>
  );
}
