import React from "react";
import VideoCustomComponent from "./videojs-component";
import { videoJSOptions } from "@/lib/constants";

interface VideoDisplayComponentProps {
  videoUrl: string;
}

export default function VideoDisplayComponent({
  videoUrl,
}: VideoDisplayComponentProps) {
  const playerRef = React.useRef<HTMLVideoElement>(null);

  const handlePlayerReady = (player: any) => {
    playerRef.current = player;
  };

  if (!videoUrl) {
    console.error("Video URL is required");
    return null;
  }

  return (
    <div className="flex flex-col items-center relative w-full aspect-videorounded-lg overflow-hidden">
      <VideoCustomComponent
        options={{
          ...videoJSOptions,
          fill: true,
          sources: [
            {
              src: videoUrl,
              type: "video/mp4",
            },
          ],
        }}
        onReady={handlePlayerReady}
      />
    </div>
  );
}
