-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "whenId" INTEGER;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_whenId_fkey" FOREIGN KEY ("whenId") REFERENCES "When"("id") ON DELETE SET NULL ON UPDATE CASCADE;
