import Redis from "ioredis";

const getRedisClient = () => {
  if (!process.env.REDIS_URL) {
    throw new Error("REDIS_URL must be set");
  }

  const redis = new Redis(process.env.REDIS_URL);
  return redis;
};

type Props = {
  topic: string;
  processMessage: (message: string) => Promise<void>;
};

export const startGettingMessageFromQueue = async ({
  topic,
  processMessage,
}: Props) => {
  const redis = getRedisClient();

  console.log(`Listening to Redis queue: ${topic}`);

  // Continuously listen for messages using blocking pop
  while (true) {
    try {
      // blpop returns [queueName, message] or null if timeout
      const result = await redis.blpop(topic, 0); // 0 means block indefinitely

      if (result) {
        const [queueName, message] = result;
        console.log({
          queue: queueName,
          message,
          timestamp: new Date().toISOString(),
        });

        try {
          await processMessage(message);
        } catch (error) {
          console.error("Error processing message:", error);
        }
      }
    } catch (error) {
      console.error("Error consuming from Redis queue:", error);
      // Wait a bit before retrying
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }
};
