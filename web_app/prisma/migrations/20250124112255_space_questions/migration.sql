/*
  Warnings:

  - You are about to drop the column `questions` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "questions";

-- CreateTable
CREATE TABLE "Question" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "order" INTEGER NOT NULL,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;
