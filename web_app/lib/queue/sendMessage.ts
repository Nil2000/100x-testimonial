import { getRedisClient } from "./client";

export const sendMessageToQueue = async (
  message: string,
  feedbackType: "TEXT" | "VIDEO"
) => {
  try {
    const redis = await getRedisClient();

    if (!process.env.REDIS_TEXT_QUEUE || !process.env.REDIS_VIDEO_QUEUE) {
      throw new Error("Redis queue environment variables not configured");
    }

    const queueName =
      feedbackType === "TEXT"
        ? process.env.REDIS_TEXT_QUEUE
        : process.env.REDIS_VIDEO_QUEUE;

    await redis.rpush(queueName, message);

    return {
      message: "Message sent successfully",
    };
  } catch (error) {
    console.log("Error sending message to queue:", error);
    return {
      error: "Failed to send message to queue",
    };
  }
};
