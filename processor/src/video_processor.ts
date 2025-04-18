import { startGettingMessageFromQueue } from "./queue/client";

const videoProcessorIp = {
  topic: process.env.KAFKA_VIDEO_TOPIC || "video-processor-topic",
  groupId: process.env.KAFKA_VIDEO_GROUP_ID || "video-processor-group",
  processMessage: async (message: string) => {
    console.log("Processing message:", message);
    // Here you can add your processing logic
  },
};

startGettingMessageFromQueue(videoProcessorIp).catch((error) => {
  console.error("Error starting Kafka consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
