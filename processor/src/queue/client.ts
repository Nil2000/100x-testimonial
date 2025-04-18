import { Kafka } from "kafkajs";

const getKafkaConsumer = (groupId: string) => {
  const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID || "kafka-client",
    brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
  });
  const consumer = kafka.consumer({ groupId });
  return consumer;
};

type Props = {
  topic: string;
  groupId: string;
  processMessage: (message: string) => void;
};

export const startGettingMessageFromQueue = async ({
  topic,
  groupId,
  processMessage,
}: Props) => {
  const consumer = getKafkaConsumer(groupId);

  await consumer.connect();
  await consumer.subscribe({
    topic,
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
