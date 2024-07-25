/*
  Warnings:

  - Added the required column `userId` to the `Theme` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Theme" ADD COLUMN     "userId" UUID NOT NULL;

-- CreateIndex
CREATE INDEX "Theme_userId_idx" ON "Theme"("userId");

-- AddForeignKey
ALTER TABLE "Theme" ADD CONSTRAINT "Theme_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
