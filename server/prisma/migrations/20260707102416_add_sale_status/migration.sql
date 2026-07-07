-- CreateEnum
CREATE TYPE "SaleStatus" AS ENUM ('COMPLETED', 'VOIDED');

-- AlterTable
ALTER TABLE "Sale" ADD COLUMN     "status" "SaleStatus" NOT NULL DEFAULT 'COMPLETED';
