/*
  Warnings:

  - Added the required column `image` to the `SectionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionType" ADD COLUMN     "image" TEXT NOT NULL;
