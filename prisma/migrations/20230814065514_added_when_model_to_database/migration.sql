-- CreateEnum
CREATE TYPE "WHEN_TYPE" AS ENUM ('DuringTheDay', 'Morning', 'BeforeFood', 'AfterFood', 'Custom');

-- CreateTable
CREATE TABLE "When" (
    "id" SERIAL NOT NULL,
    "from" TEXT,
    "to" TEXT,
    "type" "WHEN_TYPE" NOT NULL,

    CONSTRAINT "When_pkey" PRIMARY KEY ("id")
);
