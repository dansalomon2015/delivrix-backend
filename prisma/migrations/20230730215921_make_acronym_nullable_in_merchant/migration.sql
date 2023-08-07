-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Privilege" ADD VALUE 'REGISTER_MERCHANT';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_MERCHANT';
ALTER TYPE "Privilege" ADD VALUE 'ACTIVATE_MERCHANT';
ALTER TYPE "Privilege" ADD VALUE 'DESACTIVATE_MERCHANT';
ALTER TYPE "Privilege" ADD VALUE 'REGISTER_RETAILER';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_RETAILER';
ALTER TYPE "Privilege" ADD VALUE 'ACTIVATE_RETAILER';
ALTER TYPE "Privilege" ADD VALUE 'DESACTIVATE_RETAILER';

-- AlterTable
ALTER TABLE "merchants" ALTER COLUMN "acronym" DROP NOT NULL;
