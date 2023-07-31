-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "product_variants" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "products" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "retailers" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "transactions" ADD COLUMN     "modifiedBy" VARCHAR(100);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "modifiedBy" VARCHAR(100);
