/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `SectionType` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `subtitle` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "imageCaptions" TEXT[],
ADD COLUMN     "subtitle" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SectionType_title_key" ON "SectionType"("title");
