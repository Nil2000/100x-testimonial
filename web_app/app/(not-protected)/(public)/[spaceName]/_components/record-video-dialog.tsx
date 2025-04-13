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
import { Loader2 } from "lucide-react";

export default function REcordVideoDialogComponent({
  open,
  onClose,
  handleFileUpload,
  onSubmitFeedback,
}: {
  open: boolean;
  onClose: () => void;
  handleFileUpload: () => void;
  onSubmitFeedback: (uploadFile: Blob) => void;
}) {
  const [checkingPermission, setCheckingPermission] = React.useState(true);
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = React.useState<MediaDeviceInfo[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = React.useRef<MediaRecorder | null>(null);
  const [recording, setRecording] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState<Blob[]>([]);
  const [deviceChanging, setDeviceChanging] = React.useState(false);

  const handleStartRecording = () => {
    if (
      videoRef.current &&
      videoRef.current.srcObject &&
      mediaRecorderRef.current
    ) {
      mediaRecorderRef.current.start();
      let tempChunks: Blob[] = [];
      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          tempChunks.push(e.data);
        }
      };
      setRecordedChunks(tempChunks);
      setRecording(true);
    }
  };

  const setUpMediaRecorder = (stream: MediaStream) => {
    mediaRecorderRef.current = new MediaRecorder(stream);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(recordedChunks, {
          type: "video/x-matroska;codecs=avc1,opus",
        });
        // const url = URL.createObjectURL(blob);
        onSubmitFeedback(blob);
        setRecordedChunks([]);
      };
      setRecording(false);
    }
  };

  const handleDeviceChange = (
    deviceLabel: string,
    deviceType: "audio" | "video"
  ) => {
    setDeviceChanging(true);
    const device = deviceType === "audio" ? audioDevices : videoDevices;
    const deviceId = device.find(
      (device) => device.label === deviceLabel
    )?.deviceId;
    navigator.mediaDevices
      .getUserMedia({
        video:
          deviceType === "video"
            ? {
                deviceId: { exact: deviceId },
                width: { ideal: 1280 },
                height: { ideal: 720 },
              }
            : {
                width: { ideal: 1280 },
                height: { ideal: 720 },
              },
        audio:
          deviceType === "audio" ? { deviceId: { exact: deviceId } } : true,
      })
      .then((stream) => {
        if (videoRef.current) {
          const stream = videoRef.current.srcObject as MediaStream;
          if (stream) {
            stream.getTracks().forEach((track) => {
              track.stop();
            });
          }
        }
        setUpMediaRecorder(stream);
        if (videoRef.current) videoRef.current.srcObject = stream;
        setDeviceChanging(false);
      });
  };

  React.useEffect(() => {
    const getVideo = () => {
      setCheckingPermission(true);
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1280 },
            height: { ideal: 720 },
          },
          audio: true,
        })
        .then((stream) => {
          // set up media recorder
          setUpMediaRecorder(stream);

          // set the video element source
          if (videoRef.current) videoRef.current.srcObject = stream;

          // get audio and video devices
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
      setRecordedChunks([]);
      mediaRecorderRef.current = null;
    };
  }, [open]);

  return (
    <Dialog
      open={open}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent
        className="font-sans sm:max-w-md sm:w-full sm:p-6 overflow-hidden"
        onInteractOutside={(e) => {
          if (recording) {
            e.preventDefault();
          }
        }}
      >
        <DialogHeader className="w-full flex items-center">
          <DialogTitle className="text-xl font-bold">
            {checkingPermission ? "Checking permission..." : "Record a video"}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        {checkingPermission && (
          <div className="w-full">
            <Loader2 className="mx-auto animate-spin" />
          </div>
        )}
        {!checkingPermission && !permissionGranted && (
          <p className="text-destructive w-full text-center">
            You may have denied camera & microphone access, if so you will have
            to allow access in browser settings. However, you can still choose a
            file to upload.
          </p>
        )}
        <div className="aspect-w-16 aspect-h-9 relative">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className={`aspect-video rounded-sm ${
              checkingPermission || !permissionGranted ? "hidden" : "block"
            } ${recording ? "ring-1 ring-red-500" : ""}`}
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
        {!checkingPermission &&
          !recording &&
          permissionGranted &&
          videoDevices.length > 0 && (
            <div>
              <h2>Video Devices</h2>
              <SelectWrapper
                changeSelectedOption={(deviceId) => {
                  handleDeviceChange(deviceId, "video");
                }}
                defaultOption={videoDevices[0].label}
                options={videoDevices.map((device) => device.label)}
              />
            </div>
          )}
        {!checkingPermission &&
          !recording &&
          permissionGranted &&
          audioDevices.length > 0 && (
            <div>
              <h2>Audio Devices</h2>
              <SelectWrapper
                changeSelectedOption={(deviceId) => {
                  handleDeviceChange(deviceId, "audio");
                }}
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
            Choose a recorded video
          </Button>
        )}
      </DialogContent>
    </Dialog>
  );
}
