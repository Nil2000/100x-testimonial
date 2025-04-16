import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["host.docker.internal:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

type Props = {
  processMessage: (message: string) => void;
};

export const startGettingMessageFromQueue = async () => {
  await consumer.connect();
  await consumer.subscribe({
    topic: "test-topic",
    fromBeginning: true,
  });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
        topic,
        partition,
      });
    },
  });
};
