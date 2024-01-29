-- DropForeignKey
ALTER TABLE "Finding" DROP CONSTRAINT "Finding_spaceId_fkey";

-- DropForeignKey
ALTER TABLE "Finding" DROP CONSTRAINT "Finding_userId_fkey";

-- DropForeignKey
ALTER TABLE "Space" DROP CONSTRAINT "Space_userId_fkey";

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Finding" ADD CONSTRAINT "Finding_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES "Space"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "Space_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
