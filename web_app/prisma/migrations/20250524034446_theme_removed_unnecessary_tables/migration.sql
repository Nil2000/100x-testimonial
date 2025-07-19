/*
  Warnings:

  - You are about to drop the `DailyMetrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MetricsDate` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestTestimonialMetrics` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Theme` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WallOfLoveMetrics` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyMetrics" DROP CONSTRAINT "DailyMetrics_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "RequestTestimonialMetrics" DROP CONSTRAINT "RequestTestimonialMetrics_dateId_fkey";

-- DropForeignKey
ALTER TABLE "RequestTestimonialMetrics" DROP CONSTRAINT "RequestTestimonialMetrics_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "WallOfLoveMetrics" DROP CONSTRAINT "WallOfLoveMetrics_dateId_fkey";

-- DropForeignKey
ALTER TABLE "WallOfLoveMetrics" DROP CONSTRAINT "WallOfLoveMetrics_spaceId_fkey";

-- AlterTable
ALTER TABLE "Space" ADD COLUMN     "themeForRequestTestimonials" TEXT NOT NULL DEFAULT 'sunrise';

-- DropTable
DROP TABLE "DailyMetrics";

-- DropTable
DROP TABLE "MetricsDate";

-- DropTable
DROP TABLE "RequestTestimonialMetrics";

-- DropTable
DROP TABLE "Theme";

-- DropTable
DROP TABLE "WallOfLoveMetrics";
