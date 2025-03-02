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

export default function FinalDialogComponent({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [checkingPermission, setCheckingPermission] = React.useState(true);
  const [permissionGranted, setPermissionGranted] = React.useState(false);
  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = React.useState<MediaDeviceInfo[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
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
        (videoRef.current.srcObject as MediaStream)
          .getTracks()
          .forEach((track) => {
            track.stop();
          });
      }
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans">
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
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className={`aspect-video ${
            checkingPermission && !permissionGranted ? "hidden" : "block"
          }`}
        />
        {videoDevices.length > 0 && (
          <div>
            <h2>Video Devices</h2>
            <SelectWrapper
              changeSelectedOption={() => {}}
              defaultOption={videoDevices[0].label}
              options={videoDevices.map((device) => device.label)}
            />
          </div>
        )}
        {audioDevices.length > 0 && (
          <div>
            <h2>Audio Devices</h2>
            <SelectWrapper
              changeSelectedOption={() => {}}
              defaultOption={audioDevices[0].label}
              options={audioDevices.map((device) => device.label)}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
