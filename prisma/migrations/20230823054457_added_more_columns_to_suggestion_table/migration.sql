-- CreateTable
CREATE TABLE "Suggestion" (
    "id" TEXT NOT NULL,
    "status" "ASSIGNMENT_STATUS" NOT NULL DEFAULT 'Suggested',
    "startTime" TIMESTAMP(6) NOT NULL,
    "endTime" TIMESTAMP(6) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Suggestion_pkey" PRIMARY KEY ("id")
);
