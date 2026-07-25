-- AlterTable
-- Add new column
ALTER TABLE "Space" ADD COLUMN "theme" JSON;

-- Copy data from old column to new column
UPDATE "Space" SET "theme" = "themeForRequestTestimonials";

-- Drop the old column
ALTER TABLE "Space" DROP COLUMN "themeForRequestTestimonials";
