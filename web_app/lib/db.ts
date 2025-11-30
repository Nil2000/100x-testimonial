// import { PrismaClient } from "@prisma/client";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// export const db = globalForPrisma.prisma || new PrismaClient();

// // if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// globalForPrisma.prisma = db;

// export {
//   Role,
//   CollectionType,
//   FeedbackType,
//   SentimentType,
//   AnalysisStatus,
//   SourceType,
// } from "@prisma/client";

// import "dotenv/config";
// import { PrismaPg } from "@prisma/adapter-pg";
// import { PrismaClient } from "../generated/prisma/client";

// const connectionString = `${process.env.DATABASE_URL}`;

// const adapter = new PrismaPg({ connectionString });

// // const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// // export const db = globalForPrisma.prisma || new PrismaClient({ adapter });
// export const db = () => {
//   console.log(connectionString);
//   return new PrismaClient({ adapter });
// };

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };
