/*
  Warnings:

  - You are about to drop the column `vehicleType` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "vehicleType",
ADD COLUMN     "vehicle_type" "VEHICLE_TYPE";
