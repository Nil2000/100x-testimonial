import Loading from "@/components/loader";
import { Button } from "@/components/ui/button";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { div } from "motion/react-client";
import React from "react";

type Props = {
  dialogStatus: boolean;
};

export default function RecordVideoPermissions({ dialogStatus }: Props) {
  const [permissionEnabled, setPermissionEnabled] = React.useState(false);
  const [checkingPermission, setCheckingPermission] = React.useState(true);
  const [audioDevices, setAudioDevices] = React.useState<MediaDeviceInfo[]>([]);
  const [videoDevices, setVideoDevices] = React.useState<MediaDeviceInfo[]>([]);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const localVideoTrackRef = React.useRef<MediaStreamTrack | null>(null);
  const localAudioTrackRef = React.useRef<MediaStreamTrack | null>(null);
  const localStreamRef = React.useRef<MediaStream | null>(null);

  const checkPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      console.log("Permission granted");

      if (!navigator.mediaDevices?.enumerateDevices) {
        console.log("enumerateDevices() not supported.");
      } else {
        // List cameras and microphones.
        const devices = await navigator.mediaDevices.enumerateDevices();
        devices.forEach((device) => {
          if (device.kind === "audioinput") {
            setAudioDevices((prev) => [...prev, device]);
          }
          if (device.kind === "videoinput") {
            setVideoDevices((prev) => [...prev, device]);
          }
        });
      }
      if (videoRef.current) {
        videoRef.current.srcObject = new MediaStream(stream.getVideoTracks());
        stream.getTracks().forEach((track) => {
          if (track.kind === "video") {
            localVideoTrackRef.current = track;
          }
          if (track.kind === "audio") {
            localAudioTrackRef.current = track;
          }
        });
      }
      localStreamRef.current = stream;
      setCheckingPermission(false);
      setPermissionEnabled(true);
    } catch (err) {
      console.log("Permission denied");
      setPermissionEnabled(false);
      setCheckingPermission(false);
    }
  };

  const stopTracks = () => {
    // if (localVideoTrackRef.current) {
    //   localVideoTrackRef.current.stop();
    // }
    // if (localAudioTrackRef.current) {
    //   localAudioTrackRef.current.stop();
    // }
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        console.log(track);
        track.stop();
      });
    }
  };

  React.useEffect(() => {
    if (dialogStatus) {
      checkPermission();
    } else {
      stopTracks();
    }

    return () => {
      stopTracks();
    };
  }, [dialogStatus]);

  return (
    <div className="flex flex-col gap-4 py-6">
      <DialogHeader className="w-full flex items-center">
        <DialogTitle className="font-medium text-xl">
          Check your camera and microphone
        </DialogTitle>
      </DialogHeader>
      <p className="text-muted-foreground text-sm text-center">
        You have up to 120 seconds to record your video. Don’t worry: You can
        review your video before submitting it, and you can re-record if needed.
      </p>
      {checkingPermission && (
        <Button>
          <Loading />
        </Button>
      )}
      {!checkingPermission && !permissionEnabled && (
        <p className="text-destructive text-center">
          You may have denied camera & microphone access, if so you will have to
          allow access in browser settings. However, you can still choose a file
          to upload.
        </p>
      )}
      {!checkingPermission && permissionEnabled && (
        <div>
          <video ref={videoRef} autoPlay muted playsInline></video>
        </div>
      )}
    </div>
  );
}
