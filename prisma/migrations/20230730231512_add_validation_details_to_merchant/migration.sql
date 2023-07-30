-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Privilege" ADD VALUE 'VIEW_MERCHANTS';
ALTER TYPE "Privilege" ADD VALUE 'VALIDATE_MERCHANT';
ALTER TYPE "Privilege" ADD VALUE 'VIEW_RETAILERS';

-- AlterTable
ALTER TABLE "merchants" ADD COLUMN     "validatedAt" TIMESTAMP(3),
ADD COLUMN     "validatedBy" VARCHAR(200);
