// app/api/sideNotes/editSideNote/[id].ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface SideNoteUpdateData {
  title?: string;
  description?: string;
  book?: string;
  verse?: number;
  userTheme?: string;
  isPrivate?: boolean;
  workspaceId?: string;
}

export async function PUT(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("id", id);

  const {
    title,
    description,
    book,
    verse,
    userTheme,
    isPrivate,
    workspaceId,
  }: SideNoteUpdateData = await req.json();

  try {
    const existingSideNote = await prisma.sideNotesBook.findUnique({
      where: { id: String(id) }, // Convert id to string
    });

    if (!existingSideNote) {
      return NextResponse.json(
        { error: "Side note not found" },
        { status: 404 }
      );
    }

    const updatedSideNote = await prisma.sideNotesBook.update({
      where: { id: String(id) }, // Convert id to string
      data: {
        title: title || existingSideNote.title,
        description: description || existingSideNote.description,
        book: book || existingSideNote.book,
        verse: verse || existingSideNote.verse,
        userTheme: userTheme || existingSideNote.userTheme,
        isPrivate: isPrivate ?? existingSideNote.isPrivate,
        workspaceId: workspaceId || existingSideNote.workspaceId,
        updatedAt: new Date(), // Update updatedAt timestamp
      },
    });

    const allSideNotes = await prisma.sideNotesBook.findMany();

    return NextResponse.json({ allSideNotes });
  } catch (error) {
    console.error("Failed to update side note:", error);
    return NextResponse.json(
      { error: "Failed to update side note" },
      { status: 500 }
    );
  }
}
