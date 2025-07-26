-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "isAnalysisEnabled" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "ThankYouSpace" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
