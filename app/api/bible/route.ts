// "use server";

import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

import axios from "axios";

interface VerseData {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

function constructBibleApiUrl(
  version: string,
  book: string,
  chapter: number,
  verse: number
): string {
  const baseUrl = "https://cdn.jsdelivr.net/gh/wldeh/bible-api/bibles/";
  return `${baseUrl}${version}/books/${book}/chapters/${chapter}/verses/${verse}.json`;
}

export async function GET(req: NextApiRequest) {
  // const { version, book, chapter, verse } = request;

  const { searchParams } = new URL(req.url!);
  const version = searchParams.get("version");
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");
  const verse = searchParams.get("verse");

  try {
    const apiUrl = constructBibleApiUrl(
      version as string,
      book as string,
      parseInt(chapter as string),
      parseInt(verse as string)
    );
    console.log("api url: ", apiUrl);
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR bruh: ");
    return NextResponse.json(
      { error: "Failed to get Bible Verse" },
      {
        status: 500,
      }
    );
  }
}
