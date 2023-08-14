-- CreateEnum
CREATE TYPE "ASSIGNMENT_TYPE" AS ENUM ('MassIn', 'MassOut', 'MassInternal', 'ContainerDeliver', 'ContainerCollect', 'ContainerEmptying', 'ContainerSwap');

-- CreateEnum
CREATE TYPE "ASSIGNMENT_STATUS" AS ENUM ('UnderPlanning', 'Approved', 'Started', 'Completed', 'NotDelivered', 'Cancelled', 'Deleted', 'VerifiedNotDelivered', 'Unavailable', 'Suggested', 'SuggestedAndApproved');

-- CreateTable
CREATE TABLE "Assignment" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER,
    "type" "ASSIGNMENT_TYPE",
    "status" "ASSIGNMENT_STATUS" NOT NULL DEFAULT 'UnderPlanning',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
