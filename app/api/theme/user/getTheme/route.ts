import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const themes = await prisma.theme.findMany({
      include: {
        user: true, // Include the user relation
      },
    });
    return NextResponse.json(themes);
  } catch (error) {
    console.error("Failed to retrieve themes:", error);
    return NextResponse.json(
      { error: "Failed to retrieve themes" },
      { status: 500 }
    );
  }
}
