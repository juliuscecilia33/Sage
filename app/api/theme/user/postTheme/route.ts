import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { id, name, description, notesCount, workspaceId, themeColor } =
    await request.json();

  try {
    const newTheme = await prisma.theme.create({
      data: {
        id,
        name,
        description,
        createdAt: new Date(),
        updatedAt: new Date(),
        notesCount,
        workspaceId,
        themeColor,
      },
    });
    return NextResponse.json({ newTheme }, { status: 201 });
  } catch (error) {
    console.error("Failed to create Theme:", error);
    return NextResponse.json(
      { error: "Failed to create Theme" },
      { status: 500 }
    );
  }
}
