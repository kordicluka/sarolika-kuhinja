/*
  Warnings:

  - You are about to drop the column `imageCaptions` on the `Section` table. All the data in the column will be lost.
  - The `images` column on the `Section` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Section" DROP COLUMN "imageCaptions",
DROP COLUMN "images",
ADD COLUMN     "images" JSONB[];
