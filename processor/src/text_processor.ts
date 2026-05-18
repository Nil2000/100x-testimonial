import { processTextMessage } from "./utility/processTextMessage";
import { startGettingMessageFromQueue } from "./queue/client";
import type { Feedback } from "./types";

const textProcessorIp = {
  topic: process.env.REDIS_TEXT_QUEUE || "text-queue",
  groupId: "text-processor-group",
  processMessage: async (message: string) => {
    const feedback = JSON.parse(message) as Feedback;
    processTextMessage(feedback).catch((error) => {
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
