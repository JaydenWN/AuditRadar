/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Space` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Space_title_userId_key" ON "Space"("title", "userId");
