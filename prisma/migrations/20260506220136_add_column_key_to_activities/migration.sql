-- Add column_key with a temporary default, populate existing rows, then remove default
ALTER TABLE "activities" ADD COLUMN "column_key" TEXT NOT NULL DEFAULT '';

UPDATE "activities" SET "column_key" = 'electricity_kwh' WHERE "activity_id" = 1;
UPDATE "activities" SET "column_key" = 'gas_m3'          WHERE "activity_id" = 2;
UPDATE "activities" SET "column_key" = 'fuel_l'          WHERE "activity_id" = 3;

ALTER TABLE "activities" ALTER COLUMN "column_key" DROP DEFAULT;
