/*
  Warnings:

  - Added the required column `balanceAfter` to the `StockTransaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable: add nullable, backfill existing rows, then enforce NOT NULL
ALTER TABLE "StockTransaction" ADD COLUMN "balanceAfter" INTEGER;

WITH "balances" AS (
  SELECT
    "id",
    SUM(
      CASE
        WHEN "type" = 'IN' THEN "quantity"
        WHEN "type" = 'OUT' THEN -"quantity"
        WHEN "type" = 'ADJUSTMENT' THEN "quantity"
        ELSE 0
      END
    ) OVER (
      PARTITION BY "productId"
      ORDER BY "createdAt", "id"
      ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
    ) AS "balance"
  FROM "StockTransaction"
)
UPDATE "StockTransaction" st
SET "balanceAfter" = b."balance"
FROM "balances" b
WHERE st."id" = b."id";

UPDATE "StockTransaction" st
SET "balanceAfter" = p."stockQuantity"
FROM "Product" p
WHERE st."productId" = p."id"
  AND st."balanceAfter" IS NULL;

ALTER TABLE "StockTransaction" ALTER COLUMN "balanceAfter" SET NOT NULL;

-- CreateTable
CREATE TABLE "CashSession" (
    "id" SERIAL NOT NULL,
    "sessionDate" TIMESTAMP(3) NOT NULL,
    "openingCash" DECIMAL(10,2) NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CashSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CashSession_sessionDate_key" ON "CashSession"("sessionDate");
