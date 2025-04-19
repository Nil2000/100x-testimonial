import { startGettingMessageFromQueue } from "./queue/client";
import { processVideoMessage } from "./utility/processVideoMessaga";

const videoProcessorIp = {
  topic: process.env.KAFKA_VIDEO_TOPIC || "video-processor-topic",
  groupId: process.env.KAFKA_VIDEO_GROUP_ID || "video-processor-group",
  processMessage: async (message: string) => {
    processVideoMessage(message).catch((error) => {
      console.error("Error processing video message:", error.message);
      console.log(error.stack);
    });
  },
};

startGettingMessageFromQueue(videoProcessorIp).catch((error) => {
  console.error("Error starting Kafka consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
