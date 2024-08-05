/*
  Warnings:

  - The `userTheme` column on the `SideNotesBook` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "SideNotesBook" DROP COLUMN "userTheme",
ADD COLUMN     "userTheme" UUID;

-- CreateIndex
CREATE INDEX "SideNotesBook_userTheme_idx" ON "SideNotesBook"("userTheme");

-- AddForeignKey
ALTER TABLE "SideNotesBook" ADD CONSTRAINT "SideNotesBook_userTheme_fkey" FOREIGN KEY ("userTheme") REFERENCES "Theme"("id") ON DELETE SET NULL ON UPDATE CASCADE;
