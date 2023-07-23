/*
  Warnings:

  - You are about to alter the column `password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(200)`.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "token" VARCHAR(200),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(200);
