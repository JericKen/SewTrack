-- CreateEnum
CREATE TYPE "ExpenseCategory" AS ENUM ('BUSINESS', 'HOUSEHOLD', 'CAPITAL', 'UTILITIES', 'TRANSPORTATION', 'MAINTENANCE', 'OTHER');

-- AlterTable
ALTER TABLE "RepairOrder" ALTER COLUMN "repairCost" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Expense" (
    "id" SERIAL NOT NULL,
    "category" "ExpenseCategory" NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "paymentMethod" "PaymentMethod" NOT NULL,
    "description" TEXT NOT NULL,
    "expenseDate" TIMESTAMP(3) NOT NULL,
    "remarks" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Expense_pkey" PRIMARY KEY ("id")
);
