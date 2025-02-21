/*
  Warnings:

  - You are about to drop the column `logo` on the `Space` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "logoObejctKey";,
ADD COLUMN     "logo" TEXT;
