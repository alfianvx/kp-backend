/*
  Warnings:

  - You are about to drop the column `is_main` on the `Testimonial` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Testimonial" DROP COLUMN "is_main",
ADD COLUMN     "is_featured" BOOLEAN NOT NULL DEFAULT false;
