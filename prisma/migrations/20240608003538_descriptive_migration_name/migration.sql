/*
  Warnings:

  - You are about to drop the column `html` on the `Section` table. All the data in the column will be lost.
  - You are about to drop the column `html` on the `SectionType` table. All the data in the column will be lost.
  - Added the required column `jsxContent` to the `Section` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "html",
ADD COLUMN     "jsxContent" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "SectionType" DROP COLUMN "html";
