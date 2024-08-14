-- DropForeignKey
ALTER TABLE "Application" DROP CONSTRAINT "Application_workshopId_fkey";

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_workshopId_fkey" FOREIGN KEY ("workshopId") REFERENCES "Workshop"("id") ON DELETE CASCADE ON UPDATE CASCADE;
