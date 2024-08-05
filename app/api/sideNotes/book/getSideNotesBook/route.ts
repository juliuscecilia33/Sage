// app/api/sideNotes/getSideNotes/route.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sideNotes = await prisma.sideNotesBook.findMany({
      include: {
        user: true,
        theme: true,
      },
    });
    return NextResponse.json(sideNotes);
  } catch (error) {
    console.error("Failed to retrieve side notes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve side notes" },
      { status: 500 }
    );
  }
}
