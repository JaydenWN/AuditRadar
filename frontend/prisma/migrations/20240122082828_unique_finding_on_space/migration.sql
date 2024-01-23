/*
  Warnings:

  - A unique constraint covering the columns `[title,spaceId]` on the table `Finding` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Finding_title_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Finding_title_spaceId_key" ON "Finding"("title", "spaceId");
