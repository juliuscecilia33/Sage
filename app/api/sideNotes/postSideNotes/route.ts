import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { userId, title, description, book, chapter, verse } = req.body;
    try {
      const newSideNote = await prisma.sideNotes.create({
        data: {
          userId,
          title,
          description,
          book,
          chapter,
          verse, // Ensure this matches the schema
        },
      });
      res.status(201).json(newSideNote);
    } catch (error) {
      res.status(500).json({ error: "Failed to create side note" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
