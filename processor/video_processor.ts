import { startGettingMessageFromQueue } from "./queue/client";

const videoProcessorIp = {
  topic: "video-processor",
  groupId: "video-processor-group",
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
