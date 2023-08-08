/*
  Warnings:

  - Added the required column `duration` to the `api_audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_audit_logs" ADD COLUMN     "duration" INTEGER NOT NULL;
