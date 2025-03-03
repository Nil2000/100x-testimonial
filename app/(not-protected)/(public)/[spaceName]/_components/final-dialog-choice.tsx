import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import React from "react";
import SelectWrapper from "./select-wrapper";
import { Badge } from "@/components/ui/badge";

export default function FinalDialogComponent({
  open,
  onClose,
  handleFileUpload,
}: {
  open: boolean;
  onClose: () => void;
  handleFileUpload: () => void;
}) {
  const [checkingPermission, setCheckingPermission] = React.useState(true);
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = React.useState<MediaDeviceInfo[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] =
    React.useState<MediaRecorder | null>(null);
  const [recording, setRecording] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([]);

  React.useEffect(() => {
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: true,
        })
        .then((stream) => {
          if (videoRef.current) videoRef.current.srcObject = stream;

          navigator.mediaDevices.enumerateDevices().then((devices) => {
            setAudioDevices(
              devices.filter((device) => device.kind === "audioinput")
            );
            setVideoDevices(
              devices.filter((device) => device.kind === "videoinput")
            );
            setCheckingPermission(false);
            setPermissionGranted(true);
          });
        })
        .catch((err) => {
          setCheckingPermission(false);
          setPermissionGranted(false);
        });
    };

    if (open) {
      getVideo();
    }
    return () => {
      if (videoRef.current) {
        const stream = videoRef.current.srcObject as MediaStream;
        if (stream) {
          stream.getTracks().forEach((track) => {
            track.stop();
          });
        }
      }
      setRecording(false);
    };
  }, [open]);

  const handleStartRecording = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      const recorder = new MediaRecorder(stream);
      setMediaRecorder(recorder);
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks((prev) => [...prev, event.data]);
        }
      };
      recorder.start();
      setRecording(true);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent
        className="font-sans sm:max-w-md sm:w-full sm:p-6 overflow-hidden"
        onInteractOutside={(e) => {
          if (recording) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Final Dialog</DialogTitle>
          <DialogDescription>
            This is the final dialog component. It will show a video element
            that is recording the
          </DialogDescription>
        </DialogHeader>
        {checkingPermission && <p>Checking permission...</p>}
        {!checkingPermission && !permissionGranted && (
          <p className="text-destructive">Permission not granted. Try again</p>
        )}
        <div className="aspect-w-16 aspect-h-9 relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`aspect-video ${
              checkingPermission && !permissionGranted ? "hidden" : "block"
            }`}
          />
          {recording && (
            <Badge className="absolute top-2 right-2 gap-1.5 animate-pulse text-red-500 bg-transparent border-red-500 font-bold border-2">
              <span
                className="size-1.5 rounded-full bg-red-500"
                aria-hidden="true"
              ></span>
              Recording
            </Badge>
          )}
        </div>
        {!recording && videoDevices.length > 0 && (
          <div>
            <h2>Video Devices</h2>
            <SelectWrapper
              changeSelectedOption={() => {}}
              defaultOption={videoDevices[0].label}
              options={videoDevices.map((device) => device.label)}
            />
          </div>
        )}
        {!recording && audioDevices.length > 0 && (
          <div>
            <h2>Audio Devices</h2>
            <SelectWrapper
              changeSelectedOption={() => {}}
              defaultOption={audioDevices[0].label}
              options={audioDevices.map((device) => device.label)}
            />
          </div>
        )}
        {!checkingPermission && permissionGranted && (
          <>
            {recording ? (
              <Button onClick={handleStopRecording}>Stop Recording</Button>
            ) : (
              <Button onClick={handleStartRecording}>Start Recording</Button>
            )}
          </>
        )}
        {!recording && (
          <Button variant={"link"} onClick={handleFileUpload}>
            Upload file
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
