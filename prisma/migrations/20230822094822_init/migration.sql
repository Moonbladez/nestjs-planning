-- CreateEnum
CREATE TYPE "ASSIGNMENT_TYPE" AS ENUM ('MassIn', 'MassOut', 'MassInternal', 'ContainerDeliver', 'ContainerCollect', 'ContainerEmptying', 'ContainerSwap');

-- CreateEnum
CREATE TYPE "ASSIGNMENT_STATUS" AS ENUM ('UnderPlanning', 'Approved', 'Started', 'Completed', 'NotDelivered', 'Cancelled', 'Deleted', 'VerifiedNotDelivered', 'Unavailable', 'Suggested', 'SuggestedAndApproved');

-- CreateEnum
CREATE TYPE "VEHICLE_TYPE" AS ENUM ('Single', 'Double', 'Semi', 'CarWithTrailer', 'SixxSix', 'HookLift');

-- CreateEnum
CREATE TYPE "ORDER_STATUS" AS ENUM ('Created', 'UnderPlanning', 'Planned', 'Cancelled', 'Declined');

-- CreateEnum
CREATE TYPE "ORDER_TYPE" AS ENUM ('MassIn', 'MassOut', 'MassInternal', 'ContainerDeliver', 'ContainerCollect', 'ContainerEmptying');

-- CreateEnum
CREATE TYPE "WHEN_TYPE" AS ENUM ('DuringTheDay', 'Morning', 'BeforeFood', 'AfterFood', 'Custom');

-- CreateTable
CREATE TABLE "Assignment" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(6) NOT NULL,
    "endTime" TIMESTAMP(6) NOT NULL,
    "orderId" TEXT,
    "type" "ASSIGNMENT_TYPE",
    "status" "ASSIGNMENT_STATUS" NOT NULL DEFAULT 'UnderPlanning',
    "fromProjectId" TEXT,
    "toProjectId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "status" "ORDER_STATUS" NOT NULL DEFAULT 'Created',
    "type" "ORDER_TYPE" NOT NULL,
    "early_delivery" BOOLEAN NOT NULL,
    "date" TIMESTAMP(6) NOT NULL,
    "vehicle_type" "VEHICLE_TYPE",
    "numberOfVehicles" INTEGER,
    "fromProjectId" TEXT,
    "toProjectId" TEXT,
    "whenId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "region" INTEGER,
    "latitude" TEXT,
    "longitude" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "When" (
    "id" TEXT NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "type" "WHEN_TYPE" NOT NULL,

    CONSTRAINT "When_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vehicle" (
    "internalNumber" TEXT NOT NULL,
    "registration" TEXT NOT NULL,
    "manufacturer" TEXT,
    "mainCategory" TEXT,
    "subCategory" TEXT,
    "modelYear" TEXT,
    "modelName" TEXT,
    "statusName" TEXT,
    "driverId" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("internalNumber")
);

-- CreateTable
CREATE TABLE "Driver" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vehicle_driverId_key" ON "Vehicle"("driverId");

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_fromProjectId_fkey" FOREIGN KEY ("fromProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Assignment" ADD CONSTRAINT "Assignment_toProjectId_fkey" FOREIGN KEY ("toProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fromProjectId_fkey" FOREIGN KEY ("fromProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_toProjectId_fkey" FOREIGN KEY ("toProjectId") REFERENCES "Project"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_whenId_fkey" FOREIGN KEY ("whenId") REFERENCES "When"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vehicle" ADD CONSTRAINT "Vehicle_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE SET NULL ON UPDATE CASCADE;
