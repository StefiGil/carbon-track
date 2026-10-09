-- AlterTable
ALTER TABLE "emission_factors" ADD COLUMN     "source" TEXT,
ADD COLUMN     "source_url" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "emission_factors_activity_id_year_key" ON "emission_factors"("activity_id", "year");
