/*
  Warnings:

  - Added the required column `vehicleType` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VEHICLE_TYPE" AS ENUM ('Single', 'Double', 'Semi', 'CarWithTrailer', 'SixxSix', 'HookLift');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "vehicleType" "VEHICLE_TYPE" NOT NULL;
