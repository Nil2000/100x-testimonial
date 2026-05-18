import { getRedisClient } from "./client";
import { withRetry } from "../retry";

export const sendMessageToQueue = async (message: string) => {
  try {
    if (!process.env.REDIS_QUEUE) {
      throw new Error("Redis queue environment variables not configured");
    }

    await withRetry(
      async () => {
        const redis = await getRedisClient();
        await redis.rpush(process.env.REDIS_QUEUE!, message);
      },
      { label: "redis rpush" }
    );

    return {
      message: "Message sent to queue successfully",
    };
  } catch (error) {
    console.error("Error sending message to queue:", error);
    return {
      error: "Failed to send message to queue",
    };
  }
};
