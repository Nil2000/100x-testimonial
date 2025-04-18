import { Kafka } from "kafkajs";

let kafka_client, producer: any;

export const getProducer = async () => {
  if (!producer) {
    kafka_client = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || "my-app",
      brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
    });
    producer = kafka_client.producer();
    await producer.connect();
  }
  return producer;
};
