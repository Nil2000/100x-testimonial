import { getRedisClient } from "./client";

export const sendMessageToQueue = async (message: string) => {
  try {
    const redis = await getRedisClient();

    if (!process.env.REDIS_QUEUE) {
      throw new Error("Redis queue environment variables not configured");
    }

    await redis.rpush(process.env.REDIS_QUEUE, message);

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
