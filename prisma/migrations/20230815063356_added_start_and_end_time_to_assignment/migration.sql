/*
  Warnings:

  - Added the required column `endTime` to the `Assignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Assignment" ADD COLUMN     "endTime" TIMESTAMP(6) NOT NULL,
ADD COLUMN     "startTime" TIMESTAMP(6) NOT NULL;
