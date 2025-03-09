import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { videoJSOptions } from "@/lib/constants";
import { Video } from "lucide-react";
import React from "react";
import VideoCustomComponent from "./videojs-component";

export default function SubmitFeedbackDialog({
  open,
  onClose,
  videoUrl,
  retakeVideo,
}: {
  open: boolean;
  onClose: () => void;
  videoUrl: string;
  retakeVideo: () => void;
}) {
  const playerRef = React.useRef<HTMLVideoElement>(null);

  const options = {
    ...videoJSOptions,
    sources: [
      {
        src: videoUrl,
        type: "video/mp4",
      },
    ],
  };

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  return (
    <Dialog open={open} onOpenChange={() => onClose()}>
      <DialogContent className="font-sans">
        <DialogHeader className="flex flex-col items-center gap-y-3">
          <div className="bg-primary/10 text-primary-background rounded-full p-3">
            <Video size={24} />
          </div>
          <DialogTitle>Review your video</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center ">
          {/* <video src={videoUrl} controls className="aspect-video"></video> */}
          <VideoCustomComponent options={options} onReady={handlePlayerReady} />
        </div>
        <DialogFooter>
          <Button
            onClick={() => {
              onClose();
              retakeVideo();
            }}
            variant={"secondary"}
            className="w-full sm:w-24 me-2"
          >
            Retake
          </Button>
          <Button className="w-full sm:w-24 me-2" type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
