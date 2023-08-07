-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "Privilege" ADD VALUE 'VIEW_AUDIT';
ALTER TYPE "Privilege" ADD VALUE 'CREATE_PRODUCT';
ALTER TYPE "Privilege" ADD VALUE 'VIEW_PRODUCT';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_PRODUCT';
ALTER TYPE "Privilege" ADD VALUE 'DELETE_PRODUCT';
ALTER TYPE "Privilege" ADD VALUE 'VIEW_CUSTOMER';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_CUSTOMER';
ALTER TYPE "Privilege" ADD VALUE 'DELETE_CUSTOMER';
ALTER TYPE "Privilege" ADD VALUE 'CREATE_CATEGORY';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_CATEGORY';
ALTER TYPE "Privilege" ADD VALUE 'VIEW_CATEGORY';
ALTER TYPE "Privilege" ADD VALUE 'DELETE_CATEGORY';
ALTER TYPE "Privilege" ADD VALUE 'VIEW_ORDER';
ALTER TYPE "Privilege" ADD VALUE 'EDIT_ORDER';
ALTER TYPE "Privilege" ADD VALUE 'DELETE_ORDER';
