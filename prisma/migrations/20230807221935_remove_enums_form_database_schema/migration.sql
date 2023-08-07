/*
  Warnings:

  - The `privileges` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `state` on the `orders` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `payments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `transactions` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "orders" DROP COLUMN "state",
ADD COLUMN     "state" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "payments" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "privileges",
ADD COLUMN     "privileges" TEXT[];

-- DropEnum
DROP TYPE "OrderState";

-- DropEnum
DROP TYPE "PaymentStatus";

-- DropEnum
DROP TYPE "Privilege";

-- DropEnum
DROP TYPE "ProductAttributeType";
