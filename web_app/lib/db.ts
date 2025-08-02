import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

globalForPrisma.prisma = db;

export {
  Role,
  CollectionType,
  FeedbackType,
  SentimentType,
  AnalysisStatus,
  SourceType,
} from "@prisma/client";
