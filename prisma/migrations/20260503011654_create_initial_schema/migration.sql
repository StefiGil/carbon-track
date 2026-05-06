-- CreateTable
CREATE TABLE "institutions" (
    "institution_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("institution_id")
);

-- CreateTable
CREATE TABLE "activities" (
    "activity_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "unit" TEXT NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("activity_id")
);

-- CreateTable
CREATE TABLE "emission_factors" (
    "emission_factor_id" SERIAL NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "factor_value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "emission_factors_pkey" PRIMARY KEY ("emission_factor_id")
);

-- CreateTable
CREATE TABLE "consumptions" (
    "consumption_id" SERIAL NOT NULL,
    "consumption" DOUBLE PRECISION NOT NULL,
    "year" INTEGER NOT NULL,
    "month" INTEGER NOT NULL,
    "activity_id" INTEGER NOT NULL,
    "institution_id" INTEGER NOT NULL,

    CONSTRAINT "consumptions_pkey" PRIMARY KEY ("consumption_id")
);

-- AddForeignKey
ALTER TABLE "emission_factors" ADD CONSTRAINT "emission_factors_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_activity_id_fkey" FOREIGN KEY ("activity_id") REFERENCES "activities"("activity_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consumptions" ADD CONSTRAINT "consumptions_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("institution_id") ON DELETE RESTRICT ON UPDATE CASCADE;
