// app/api/sideNotes/postSideNotes/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { userId, title, description, book, chapter, verse } =
    await request.json();

  try {
    const newSideNote = await prisma.sideNotes.create({
      data: {
        userId,
        title,
        description,
        book,
        chapter,
        verse,
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
