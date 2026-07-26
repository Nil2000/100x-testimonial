import { processTextMessage } from "./utility/processTextMessage";
import { startGettingMessageFromQueue } from "./queue/client";
import type { Feedback } from "./types";
import { processVideoMessage } from "./utility/processVideoMessage";

const processorIp = {
  topic: process.env.REDIS_QUEUE || "testimonial-queue",
  groupId: "testimonial-processor-group",
  processMessage: async (message: string) => {
    const feedback = JSON.parse(message) as Feedback;

    console.log("Processing feedback:", feedback);

    if (feedback.isVideo) {
      // Handle video feedback
      processVideoMessage(feedback).catch((error) => {
        console.error("Error processing video message:", error.message);
        console.log(error.stack);
      });
    } else {
      // Handle text feedback
      processTextMessage(feedback).catch((error) => {
        console.error("Error processing message:", error.message);
        console.log(error.stack);
      });
    }
  },
};

startGettingMessageFromQueue(processorIp).catch((error) => {
  console.error("Error starting Redis consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
