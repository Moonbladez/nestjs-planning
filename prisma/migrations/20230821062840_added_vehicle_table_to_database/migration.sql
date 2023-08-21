-- CreateTable
CREATE TABLE "Vehicle" (
    "internalNumber" SERIAL NOT NULL,
    "registration" TEXT NOT NULL,
    "manufacturer" TEXT,
    "mainCategory" TEXT,
    "subCategory" TEXT,
    "modelYear" TEXT,
    "modelName" TEXT,
    "statusName" TEXT,

    CONSTRAINT "Vehicle_pkey" PRIMARY KEY ("internalNumber")
);
