/*
  Warnings:

  - Added the required column `location` to the `merchants` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "location" VARCHAR(500) NOT NULL;
