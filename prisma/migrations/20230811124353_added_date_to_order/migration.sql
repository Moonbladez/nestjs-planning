/*
  Warnings:

  - You are about to drop the column `earlyDelivery` on the `Order` table. All the data in the column will be lost.
  - Added the required column `date` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `early_delivery` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "earlyDelivery",
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "early_delivery" BOOLEAN NOT NULL;
