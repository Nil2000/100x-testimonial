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
  processMessage: (message: string) => Promise<void>;
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
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        offset: message.offset,
        value: message?.value?.toString(),
        topic,
        partition,
      });

      if (message.value) {
        processMessage(message.value.toString()).catch((error) => {
          console.error("Error processing message:", error.message);
          console.log(error.stack);
        });
      }
    },
  });
};
