import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { useRouter } from "next/router";

const prisma = new PrismaClient();

export async function DELETE(req: Request, res: NextApiResponse) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  console.log("delete ID:", id);

  if (!id) {
    return NextResponse.json({ error: "ID" }, { status: 404 });
    return;
  }

  try {
    const existingSideNote = await prisma.sideNotesBook.findUnique({
      where: { id: String(id) }, // Convert id to string
    });

    if (existingSideNote) {
      await prisma.sideNotesBook.delete({
        where: { id: String(id) }, // Convert id to string
      });
    } else {
      return NextResponse.json(
        { error: "Side note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: `Side note with ID ${id} deleted successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to delete side note:", error);
    return NextResponse.json(
      { error: "Failed to delete side note" },
      { status: 500 }
    );
  }
}
