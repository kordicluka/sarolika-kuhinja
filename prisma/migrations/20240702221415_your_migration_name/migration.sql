/*
  Warnings:

  - You are about to drop the `Section` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `sections` to the `Meal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sections` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sections` to the `Workshop` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_mealId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_postId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_sectionTypeId_fkey";

-- DropForeignKey
ALTER TABLE "Section" DROP CONSTRAINT "Section_workshopId_fkey";

-- AlterTable
ALTER TABLE "Meal" ADD COLUMN     "sections" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "sections" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Workshop" ADD COLUMN     "sections" JSONB NOT NULL;

-- DropTable
DROP TABLE "Section";

-- CreateIndex
CREATE INDEX "Account_userId_idx" ON "Account"("userId");

-- CreateIndex
CREATE INDEX "Application_workshopId_idx" ON "Application"("workshopId");

-- CreateIndex
CREATE INDEX "Meal_createdById_idx" ON "Meal"("createdById");

-- CreateIndex
CREATE INDEX "Meal_lastEditedById_idx" ON "Meal"("lastEditedById");

-- CreateIndex
CREATE INDEX "Post_createdById_idx" ON "Post"("createdById");

-- CreateIndex
CREATE INDEX "Post_lastEditedById_idx" ON "Post"("lastEditedById");

-- CreateIndex
CREATE INDEX "Session_userId_idx" ON "Session"("userId");

-- CreateIndex
CREATE INDEX "Workshop_createdById_idx" ON "Workshop"("createdById");

-- CreateIndex
CREATE INDEX "Workshop_lastEditedById_idx" ON "Workshop"("lastEditedById");
