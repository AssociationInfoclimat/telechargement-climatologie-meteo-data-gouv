/*
  Warnings:

  - You are about to drop the column `QPERMIN` on the `Horaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Horaire"
    DROP COLUMN "QPERMIN",
    ADD COLUMN "QPMERMIN" INTEGER;
