import { startGettingMessageFromQueue } from "./queue/client";

const textProcessorIp = {
  topic: "text-processor",
  groupId: "text-processor-group",
  processMessage: async (message: string) => {
    console.log("Processing message:", message);
    // Here you can add your processing logic
  },
};

startGettingMessageFromQueue(textProcessorIp).catch((error) => {
  console.error("Error starting Kafka consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
