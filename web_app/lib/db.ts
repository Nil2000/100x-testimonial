import { PrismaClient } from "@prisma-db-postgres/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

export {
  Role,
  CollectionType,
  FeedbackType,
  SentimentType,
  AnalysisStatus,
} from "@prisma-db-postgres/client";
