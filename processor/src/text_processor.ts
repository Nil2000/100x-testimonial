import { processTextMessage } from "./utility/processTextMessage";
import { startGettingMessageFromQueue } from "./queue/client";

const textProcessorIp = {
  topic: process.env.KAFKA_TEXT_TOPIC || "text-processor-topic",
  groupId: process.env.KAFKA_TEXT_GROUP_ID || "text-processor-group",
  processMessage: async (message: string) => {
    processTextMessage(message).catch((error) => {
      console.error("Error processing message:", error.message);
      console.log(error.stack);
    });
  },
};

startGettingMessageFromQueue(textProcessorIp).catch((error) => {
  console.error("Error starting Kafka consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
