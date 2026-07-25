-- AlterTable
ALTER TABLE "Feedback" ADD COLUMN     "isArchived" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "deletedAt" TIMESTAMP(3);
