-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectNumber" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "region" INTEGER,
    "latitute" TEXT,
    "longitude" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectNumber")
);
