/*
  Warnings:

  - The primary key for the `Vehicle` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Vehicle" DROP CONSTRAINT "Vehicle_pkey",
ALTER COLUMN "internalNumber" DROP DEFAULT,
ALTER COLUMN "internalNumber" SET DATA TYPE TEXT,
ADD CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("internalNumber");
DROP SEQUENCE "Vehicle_internalNumber_seq";
