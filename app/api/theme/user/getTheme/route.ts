import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const sideNotes = await prisma.theme.findMany({
      include: {
        user: true,
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
