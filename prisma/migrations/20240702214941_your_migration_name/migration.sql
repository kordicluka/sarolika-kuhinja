/*
  Warnings:

  - You are about to drop the column `description` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `images` on the `Section` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "description",
DROP COLUMN "images";
