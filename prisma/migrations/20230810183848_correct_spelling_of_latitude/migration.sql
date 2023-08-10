/*
  Warnings:

  - You are about to drop the column `latitute` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "latitute",
ADD COLUMN     "latitude" TEXT;
