/*
  Warnings:

  - You are about to drop the column `themeId` on the `Space` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_themeId_fkey";

-- DropIndex
DROP INDEX "Space_themeId_key";

-- AlterTable
ALTER TABLE "Space" DROP COLUMN "themeId";
