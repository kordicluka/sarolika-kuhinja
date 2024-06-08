/*
  Warnings:

  - Added the required column `html` to the `Section` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `images` on the `Section` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Section" ADD COLUMN     "html" TEXT NOT NULL,
DROP COLUMN "images",
ADD COLUMN     "images" JSONB NOT NULL;
