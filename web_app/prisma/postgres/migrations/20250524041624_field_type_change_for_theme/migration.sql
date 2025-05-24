/*
  Warnings:

  - The `themeForRequestTestimonials` column on the `Space` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Space" DROP COLUMN "themeForRequestTestimonials",
ADD COLUMN     "themeForRequestTestimonials" JSON;
