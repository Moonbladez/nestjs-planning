/*
  Warnings:

  - Added the required column `type` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ORDER_TYPE" AS ENUM ('MassIn', 'MassOut', 'MassInternal', 'ContainerDeliver', 'ContainerCollect', 'ContainerEmptying');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "type" "ORDER_TYPE" NOT NULL;
