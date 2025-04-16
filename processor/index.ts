import { startGettingMessageFromQueue } from "./queue/client";

startGettingMessageFromQueue().catch((error) => {
  console.error("Error starting Kafka consumer:", error.message);
  console.log(error.stack);
  process.exit(1);
});
