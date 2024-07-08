// app/api/sideNotes/deleteSideNote/[id].ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(request: any) {
  const { id } = request.query;

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

    await prisma.sideNotesBook.delete({
      where: { id: String(id) }, // Convert id to string
    });

    return NextResponse.json({ message: "Side note deleted successfully" });
  } catch (error) {
    console.error("Failed to delete side note:", error);
    return NextResponse.json(
      { error: "Failed to delete side note" },
      { status: 500 }
    );
  }
}
