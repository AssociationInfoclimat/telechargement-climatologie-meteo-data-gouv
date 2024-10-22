/*
  Warnings:

  - You are about to drop the column `QCB2` on the `Horaire` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Horaire"
    DROP COLUMN "QCB2",
    ADD COLUMN "QB2" INTEGER;
