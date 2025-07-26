-- CreateEnum
CREATE TYPE "SentimentType" AS ENUM ('POSITIVE', 'NEGATIVE', 'NEUTRAL');

-- CreateEnum
CREATE TYPE "AnalysisStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "analysisStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN     "isSpam" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sentiment" "SentimentType" NOT NULL DEFAULT 'NEUTRAL';
