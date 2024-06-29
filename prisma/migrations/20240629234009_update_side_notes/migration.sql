-- AlterTable
ALTER TABLE "SideNotesBook" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "workspaceId" UUID;

-- AlterTable
ALTER TABLE "SideNotesChapter" ADD COLUMN     "isPrivate" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "theme" TEXT,
ADD COLUMN     "workspaceId" UUID;
