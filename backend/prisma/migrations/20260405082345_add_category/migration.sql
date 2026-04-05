-- AlterTable: add category with a temporary default, then drop the default
ALTER TABLE "products" ADD COLUMN "category" TEXT NOT NULL DEFAULT 'Other';
ALTER TABLE "products" ALTER COLUMN "category" DROP DEFAULT;
