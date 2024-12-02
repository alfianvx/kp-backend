/*
  Warnings:

  - Added the required column `logo_url` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_url` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "logo_url" TEXT NOT NULL,
ADD COLUMN     "short_description" TEXT NOT NULL,
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "thumbnail_url" TEXT NOT NULL;
