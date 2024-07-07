/*
  Warnings:

  - Made the column `childName` on table `Application` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Application" ALTER COLUMN "childName" SET NOT NULL;
