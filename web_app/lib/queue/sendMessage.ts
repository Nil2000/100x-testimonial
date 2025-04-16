import { createId } from "@paralleldrive/cuid2";
import { getProducer } from "./client";

export const sendMessageToQueue = async (message: string, key?: string) => {
  try {
    const producer = await getProducer();

    if (!producer) {
      throw new Error("Producer not initialized");
    }

    const topic = process.env.KAFKA_TOPIC || "testimonials";
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
