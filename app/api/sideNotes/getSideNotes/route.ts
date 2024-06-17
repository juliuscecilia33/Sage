import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const sideNotes = await prisma.sideNotes.findMany({
        include: {
          user: true, // Include related profile
        },
      });
      res.status(200).json(sideNotes);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch side notes" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
