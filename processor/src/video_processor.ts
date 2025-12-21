import { startGettingMessageFromQueue } from "./queue/client";
import { processVideoMessage } from "./utility/processVideoMessaga";

const videoProcessorIp = {
  topic: process.env.REDIS_VIDEO_QUEUE || "video-queue",
  groupId: "video-processor-group",
  processMessage: async (message: string) => {
    processVideoMessage(message).catch((error) => {
      console.error("Error processing video message:", error.message);
      console.log(error.stack);
    });
  },
};

startGettingMessageFromQueue(videoProcessorIp).catch((error) => {
  console.error("Error starting Redis consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
