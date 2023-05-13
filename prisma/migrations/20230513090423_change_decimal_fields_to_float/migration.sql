/*
  Warnings:

  - You are about to alter the column `subTotal` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `subTotalWithTax` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `shippingFees` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `amount` on the `transactions` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "subTotal" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "subTotalWithTax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "shippingFees" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
