/*
  Warnings:

  - Added the required column `maxImages` to the `SectionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionType" ADD COLUMN     "maxImages" INTEGER NOT NULL;
