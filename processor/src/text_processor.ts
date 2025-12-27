import { processTextMessage } from "./utility/processTextMessage";
import { startGettingMessageFromQueue } from "./queue/client";

const textProcessorIp = {
  topic: process.env.REDIS_TEXT_QUEUE || "text-queue",
  groupId: "text-processor-group",
  processMessage: async (message: string) => {
    processTextMessage(message).catch((error) => {
      console.error("Error processing message:", error.message);
      console.log(error.stack);
    });
  },
};

startGettingMessageFromQueue(textProcessorIp).catch((error) => {
  console.error("Error starting Redis consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
