/*
  Warnings:

  - You are about to alter the column `phone` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `areas` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `description` on the `categories` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `code` on the `coupons` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `merchants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `phone` on the `merchants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `reference` on the `orders` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `paymentMethods` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `unit` on the `product_variants` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `description` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `image` on the `products` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `name` on the `quaters` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `retailers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `phone` on the `retailers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `email` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.
  - You are about to alter the column `imageUrl` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "phone" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "areas" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "categories" ALTER COLUMN "description" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "coupons" ALTER COLUMN "code" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "merchants" ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "reference" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "paymentMethods" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "product_variants" ALTER COLUMN "unit" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "products" ALTER COLUMN "description" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "quaters" ALTER COLUMN "name" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "retailers" ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "phone" SET DATA TYPE VARCHAR(200);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "email" SET DATA TYPE VARCHAR(200),
ALTER COLUMN "imageUrl" SET DATA TYPE VARCHAR(200);
