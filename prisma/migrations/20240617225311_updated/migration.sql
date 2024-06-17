/*
  Warnings:

  - You are about to drop the column `Verse` on the `SideNotes` table. All the data in the column will be lost.
  - Added the required column `verse` to the `SideNotes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SideNotes" DROP COLUMN "Verse",
ADD COLUMN     "verse" INTEGER NOT NULL;
