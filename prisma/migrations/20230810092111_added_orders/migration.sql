-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "fromProjectId" INTEGER,
ADD COLUMN     "toProjectId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_fromProjectId_fkey" FOREIGN KEY ("fromProjectId") REFERENCES "Project"("projectNumber") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_toProjectId_fkey" FOREIGN KEY ("toProjectId") REFERENCES "Project"("projectNumber") ON DELETE SET NULL ON UPDATE CASCADE;
