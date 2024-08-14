-- DropIndex
DROP INDEX "Application_workshopId_idx";

-- DropIndex
DROP INDEX "Meal_createdById_idx";

-- DropIndex
DROP INDEX "Meal_lastEditedById_idx";

-- DropIndex
DROP INDEX "Post_createdById_idx";

-- DropIndex
DROP INDEX "Post_lastEditedById_idx";

-- DropIndex
DROP INDEX "Workshop_createdById_idx";

-- DropIndex
DROP INDEX "Workshop_lastEditedById_idx";

-- CreateIndex
CREATE INDEX "Meal_slug_idx" ON "Meal"("slug");

-- CreateIndex
CREATE INDEX "Meal_id_idx" ON "Meal"("id");

-- CreateIndex
CREATE INDEX "Post_slug_idx" ON "Post"("slug");

-- CreateIndex
CREATE INDEX "Post_id_idx" ON "Post"("id");

-- CreateIndex
CREATE INDEX "User_id_idx" ON "User"("id");

-- CreateIndex
CREATE INDEX "Workshop_slug_idx" ON "Workshop"("slug");

-- CreateIndex
CREATE INDEX "Workshop_id_idx" ON "Workshop"("id");
