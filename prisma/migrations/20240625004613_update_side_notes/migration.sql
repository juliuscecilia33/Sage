/*
  Warnings:

  - You are about to drop the `SideNotes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SideNotes" DROP CONSTRAINT "SideNotes_userId_fkey";

-- DropTable
DROP TABLE "SideNotes";

-- CreateTable
CREATE TABLE "SideNotesBook" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "book" TEXT NOT NULL,
    "verse" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SideNotesBook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SideNotesChapter" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "book" TEXT NOT NULL,
    "chapter" INTEGER NOT NULL,
    "verse" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SideNotesChapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SideNotesBook_userId_idx" ON "SideNotesBook"("userId");

-- CreateIndex
CREATE INDEX "SideNotesChapter_userId_idx" ON "SideNotesChapter"("userId");

-- AddForeignKey
ALTER TABLE "SideNotesBook" ADD CONSTRAINT "SideNotesBook_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SideNotesChapter" ADD CONSTRAINT "SideNotesChapter_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
