-- CreateEnum
CREATE TYPE "SourceType" AS ENUM ('WEBSITE', 'X', 'LINKEDIN', 'OTHER');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "metadata" JSONB,
ADD COLUMN     "source" "SourceType" NOT NULL DEFAULT 'WEBSITE',
ADD COLUMN     "sourceUrl" TEXT;
