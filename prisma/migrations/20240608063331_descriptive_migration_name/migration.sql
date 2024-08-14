/*
  Warnings:

  - You are about to drop the column `maxImages` on the `SectionType` table. All the data in the column will be lost.
  - Added the required column `jsxContent` to the `SectionType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SectionType" DROP COLUMN "maxImages",
ADD COLUMN     "jsxContent" JSONB NOT NULL;
