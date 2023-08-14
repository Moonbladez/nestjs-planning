-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('Created', 'UnderPlanning', 'Planned', 'Cancelled', 'Declined');

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "status" "ORDER_STATUS" NOT NULL DEFAULT 'Created';
