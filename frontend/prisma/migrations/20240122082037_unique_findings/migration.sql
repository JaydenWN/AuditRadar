/*
  Warnings:

  - A unique constraint covering the columns `[title,userId]` on the table `Finding` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Finding_title_userId_key" ON "Finding"("title", "userId");
