-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "videoUrl" TEXT,
ALTER COLUMN "answer" DROP NOT NULL;
