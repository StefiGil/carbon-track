-- CreateTable
CREATE TABLE "reports" (
    "report_id" SERIAL NOT NULL,
    "institution_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "year_from" INTEGER NOT NULL,
    "year_to" INTEGER NOT NULL,
    "total_co2" DOUBLE PRECISION NOT NULL,
    "file_path" TEXT,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("report_id")
);

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institutions"("institution_id") ON DELETE RESTRICT ON UPDATE CASCADE;
