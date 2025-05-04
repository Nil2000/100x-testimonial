-- CreateTable
CREATE TABLE "MetricsDate" (
    "id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "MetricsDate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequestTestimonialMetrics" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "dateId" TEXT NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "visitors" INTEGER NOT NULL DEFAULT 0,
    "completedActions" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RequestTestimonialMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WallOfLoveMetrics" (
    "id" TEXT NOT NULL,
    "spaceId" TEXT NOT NULL,
    "dateId" TEXT NOT NULL,
    "pageViews" INTEGER NOT NULL DEFAULT 0,
    "visitors" INTEGER NOT NULL DEFAULT 0,
    "timeSpentOnWallOfLove" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WallOfLoveMetrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MetricsDate_date_key" ON "MetricsDate"("date");

-- CreateIndex
CREATE INDEX "MetricsDate_date_idx" ON "MetricsDate"("date");

-- CreateIndex
CREATE INDEX "RequestTestimonialMetrics_spaceId_idx" ON "RequestTestimonialMetrics"("spaceId");

-- CreateIndex
CREATE INDEX "RequestTestimonialMetrics_dateId_idx" ON "RequestTestimonialMetrics"("dateId");

-- CreateIndex
CREATE UNIQUE INDEX "RequestTestimonialMetrics_spaceId_dateId_key" ON "RequestTestimonialMetrics"("spaceId", "dateId");

-- CreateIndex
CREATE INDEX "WallOfLoveMetrics_spaceId_idx" ON "WallOfLoveMetrics"("spaceId");

-- CreateIndex
CREATE INDEX "WallOfLoveMetrics_dateId_idx" ON "WallOfLoveMetrics"("dateId");

-- CreateIndex
CREATE UNIQUE INDEX "WallOfLoveMetrics_spaceId_dateId_key" ON "WallOfLoveMetrics"("spaceId", "dateId");

-- AddForeignKey
ALTER TABLE "RequestTestimonialMetrics" ADD CONSTRAINT "RequestTestimonialMetrics_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RequestTestimonialMetrics" ADD CONSTRAINT "RequestTestimonialMetrics_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "MetricsDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WallOfLoveMetrics" ADD CONSTRAINT "WallOfLoveMetrics_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WallOfLoveMetrics" ADD CONSTRAINT "WallOfLoveMetrics_dateId_fkey" FOREIGN KEY ("dateId") REFERENCES "MetricsDate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
