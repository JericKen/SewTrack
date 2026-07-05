/*
  Warnings:

  - You are about to drop the `StockTransaction` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `type` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProductType" AS ENUM ('RESALE', 'MANUFACTURED', 'MATERIAL');

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'STAFF';

-- AlterEnum
ALTER TYPE "Unit" ADD VALUE 'BUNDLE';

-- DropForeignKey
ALTER TABLE "StockTransaction" DROP CONSTRAINT "StockTransaction_productId_fkey";

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "type" "ProductType" NOT NULL;

-- DropTable
DROP TABLE "StockTransaction";

-- DropEnum
DROP TYPE "StockTransactionType";
