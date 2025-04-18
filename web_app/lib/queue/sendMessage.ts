import { createId } from "@paralleldrive/cuid2";
import { getProducer } from "./client";
import { KAFKA_QUEUE } from "../constants";

export const sendMessageToQueue = async (
  message: string,
  feedbackType: "TEXT" | "VIDEO",
  key?: string
) => {
  try {
    const producer = await getProducer();

    if (!producer) {
      throw new Error("Producer not initialized");
    }

    const topic =
      feedbackType === "TEXT"
        ? KAFKA_QUEUE.text_topic
        : KAFKA_QUEUE.video_topic; // Determine the topic based on feedback type
    await producer.send({
      topic,
      messages: [
        {
          key: key || createId(), // Generate a unique key for the message
          value: message, // The message content
        },
      ],
    });

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
