/*
  Warnings:

  - You are about to drop the column `css` on the `SectionType` table. All the data in the column will be lost.
  - Added the required column `html` to the `SectionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionType" DROP COLUMN "css",
ADD COLUMN     "html" TEXT NOT NULL;
