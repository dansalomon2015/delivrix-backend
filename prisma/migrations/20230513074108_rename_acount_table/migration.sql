/*
  Warnings:

  - You are about to drop the `acounts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "acounts" DROP CONSTRAINT "acounts_customerId_fkey";

-- DropForeignKey
ALTER TABLE "acounts" DROP CONSTRAINT "acounts_methodId_fkey";

-- DropForeignKey
ALTER TABLE "payments" DROP CONSTRAINT "payments_accountId_fkey";

-- DropTable
DROP TABLE "acounts";

-- CreateTable
CREATE TABLE "accounts" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "methodId" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "createdBy" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "accounts_phone_key" ON "accounts"("phone");

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "accounts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accounts" ADD CONSTRAINT "accounts_methodId_fkey" FOREIGN KEY ("methodId") REFERENCES "paymentMethods"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
