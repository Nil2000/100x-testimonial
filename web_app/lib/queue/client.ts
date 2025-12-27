// import { Kafka } from "kafkajs";

// let kafka_client, producer: any;

// export const getProducer = async () => {
//   if (!producer) {
//     kafka_client = new Kafka({
//       clientId: process.env.KAFKA_CLIENT_ID || "my-app",
//       brokers: [process.env.KAFKA_BROKER || "localhost:9092"],
//     });
//     producer = kafka_client.producer();
//     await producer.connect();
//   }
//   return producer;
// };

import Redis from "ioredis";

let redis_client: Redis | null = null;

export const getRedisClient = async () => {
  if (redis_client) {
    return redis_client;
  }

  try {
    if (!process.env.REDIS_URL) {
      throw new Error("REDIS_URL must be set");
    }

    redis_client = new Redis(process.env.REDIS_URL);

    console.log("Connected to Redis");
    return redis_client;
  } catch (error: any) {
    console.error("Error creating Redis client:", error.message);
    console.log(error.stack);
    throw error;
  }
};
