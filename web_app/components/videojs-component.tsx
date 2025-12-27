/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "video.js/dist/video-js.css";
import videojs from "video.js";

type VideoCustomComponentProps = {
  options: any;
  onReady: (player: any) => void;
};

export default function VideoCustomComponent({
  options,
  onReady,
}: VideoCustomComponentProps) {
  const videoRef = React.useRef<any>(null);
  const playerRef = React.useRef<any>(null);

  React.useEffect(() => {
    // Make sure Video.js player is only initialized once
    if (!playerRef.current) {
      // The Video.js player needs to be _inside_ the component el for React 18 Strict Mode.
      const videoElement = document.createElement("video-js");

      videoElement.classList.add("vjs-big-play-centered");
      videoRef.current?.appendChild(videoElement);

      const player = (playerRef.current = videojs(videoElement, options, () => {
        onReady && onReady(player);
      }));

      // You could update an existing player in the `else` block here
      // on prop change, for example:
    } else {
      const player = playerRef.current;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  // Dispose the Video.js player when the functional component unmounts
  React.useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div
      data-vjs-player
      className="w-full h-min rounded-md overflow-hidden mx-auto my-0"
    >
      <div ref={videoRef} className="w-full h-max rounded-md" />
    </div>
  );
}
