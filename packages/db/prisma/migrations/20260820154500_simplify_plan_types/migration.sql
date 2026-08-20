-- Recast PlanType: FREE | TRIAL | STARTER | PROFESSIONAL | ENTERPRISE
--                 -> FREE | PRO | ENTERPRISE
-- TRIAL/STARTER map to PRO (same 1/5/25 limits). PROFESSIONAL maps to
-- ENTERPRISE (same 3/10/50 limits).
ALTER TYPE "PlanType" RENAME TO "PlanType_old";
CREATE TYPE "PlanType" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');
ALTER TABLE "User" ALTER COLUMN "plan" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "plan" TYPE "PlanType" USING (
  CASE "plan"::text
    WHEN 'TRIAL' THEN 'PRO'
    WHEN 'STARTER' THEN 'PRO'
    WHEN 'PROFESSIONAL' THEN 'ENTERPRISE'
    WHEN 'ENTERPRISE' THEN 'ENTERPRISE'
    ELSE 'FREE'
  END)::"PlanType";
ALTER TABLE "User" ALTER COLUMN "plan" SET DEFAULT 'FREE';
DROP TYPE "PlanType_old";

-- Recast SubscriptionStatus to add ON_HOLD (cannot ADD VALUE and use it
-- in the same transaction).
ALTER TYPE "SubscriptionStatus" RENAME TO "SubscriptionStatus_old";
CREATE TYPE "SubscriptionStatus" AS ENUM ('ACTIVE', 'ON_HOLD', 'EXPIRED', 'CANCELLED');
ALTER TABLE "User" ALTER COLUMN "subscriptionStatus" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "subscriptionStatus" TYPE "SubscriptionStatus"
  USING ("subscriptionStatus"::text::"SubscriptionStatus");
ALTER TABLE "User" ALTER COLUMN "subscriptionStatus" SET DEFAULT 'ACTIVE';
DROP TYPE "SubscriptionStatus_old";

ALTER TABLE "User" DROP COLUMN "trialStartDate";
ALTER TABLE "User" ADD COLUMN "customerId" TEXT;
