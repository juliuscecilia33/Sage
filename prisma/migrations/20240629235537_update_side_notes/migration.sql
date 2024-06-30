/*
  Warnings:

  - You are about to drop the column `theme` on the `SideNotesBook` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `SideNotesChapter` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SideNotesBook" DROP COLUMN "theme",
ADD COLUMN     "userTheme" TEXT;

-- AlterTable
ALTER TABLE "SideNotesChapter" DROP COLUMN "theme",
ADD COLUMN     "userTheme" TEXT;
