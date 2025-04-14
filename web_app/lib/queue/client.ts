import { Kafka } from "kafkajs";

const kafka_client = new Kafka({
  clientId: "testimonial-app",
  brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
});

const producer = kafka_client.producer();

export const sendToQueue = async (message: string) => {
  await producer.send({
    topic: process.env.KAFKA_TOPIC || "testimonials",
    messages: [{ value: message }],
  });
};
