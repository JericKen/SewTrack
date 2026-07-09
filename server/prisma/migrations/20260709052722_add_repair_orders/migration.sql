-- CreateEnum
CREATE TYPE "RepairStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'READY_FOR_PICKUP', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "RepairOrder" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER,
    "customerName" TEXT NOT NULL,
    "phone" TEXT,
    "itemType" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "repairCost" DECIMAL(10,2) NOT NULL,
    "status" "RepairStatus" NOT NULL DEFAULT 'PENDING',
    "receivedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" TIMESTAMP(3),
    "completedAt" TIMESTAMP(3),
    "claimedAt" TIMESTAMP(3),
    "remarks" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RepairOrder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RepairOrder" ADD CONSTRAINT "RepairOrder_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
