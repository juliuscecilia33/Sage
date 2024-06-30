import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const {
    userId,
    title,
    description,
    book,
    verse,
    userTheme,
    isPrivate,
    workspaceId,
  } = await request.json();

  try {
    const newSideNote = await prisma.sideNotesBook.create({
      data: {
        userId,
        title,
        description,
        book,
        verse,
        createdAt: new Date(),
        updatedAt: new Date(),
        userTheme,
        isPrivate,
        workspaceId,
      },
    });
    return NextResponse.json(newSideNote, { status: 201 });
  } catch (error) {
    console.error("Failed to create side note:", error);
    return NextResponse.json(
      { error: "Failed to create side note" },
      { status: 500 }
    );
  }
}

// npx prisma generate
// npx prisma migrate dev -- name [name]

// TODO: Enable RLS
