/*
  Warnings:

  - You are about to drop the column `active` on the `api_audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `deleted` on the `api_audit_logs` table. All the data in the column will be lost.
  - You are about to drop the column `request` on the `api_audit_logs` table. All the data in the column will be lost.
  - You are about to drop the `crm_audit_logs` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `params` to the `api_audit_logs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api_audit_logs" DROP COLUMN "active",
DROP COLUMN "deleted",
DROP COLUMN "request",
ADD COLUMN     "params" JSONB NOT NULL;

-- DropTable
DROP TABLE "crm_audit_logs";
