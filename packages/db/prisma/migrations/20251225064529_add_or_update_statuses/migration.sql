/*
  Warnings:
  - You are about to drop the column `analysisStatus` on the `Feedback` table. All the data in the column will be lost.
  - You are about to drop the column `isAnalysisEnabled` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" 
ADD COLUMN "tempAnalysisStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING';

-- Preserve existing data
UPDATE "Feedback" SET "tempAnalysisStatus" = "analysisStatus";

-- Drop old column and add new ones
ALTER TABLE "Feedback" 
DROP COLUMN "analysisStatus",
ADD COLUMN "sentimentStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING',
ADD COLUMN "spamStatus" "AnalysisStatus" NOT NULL DEFAULT 'PENDING';

-- Copy data to new column
UPDATE "Feedback" SET "sentimentStatus" = "tempAnalysisStatus";

-- Drop temporary column
ALTER TABLE "Feedback" DROP COLUMN "tempAnalysisStatus";

-- AlterTable
ALTER TABLE "Space" 
ADD COLUMN "tempIsAnalysisEnabled" BOOLEAN NOT NULL DEFAULT false;

-- Preserve existing data
UPDATE "Space" SET "tempIsAnalysisEnabled" = "isAnalysisEnabled";

-- Drop old column and add new ones
ALTER TABLE "Space" 
DROP COLUMN "isAnalysisEnabled",
ADD COLUMN "isSentimentEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN "isSpamEnabled" BOOLEAN NOT NULL DEFAULT false;

-- Copy data to new column
UPDATE "Space" SET "isSentimentEnabled" = "tempIsAnalysisEnabled";

-- Drop temporary column
ALTER TABLE "Space" DROP COLUMN "tempIsAnalysisEnabled";
