// "use server";

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { getBookId } from "@/utils/getBookId";

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
  chapter: number
): string {
  const baseUrl = "https://bible-go-api.rkeplin.com/v1/books/";

  const bookId = getBookId(book);

  return `${baseUrl}${bookId}/chapters/${chapter}?translation=${version}`;
}

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  const version = searchParams.get("version");
  const book = searchParams.get("book");
  const chapter = searchParams.get("chapter");

  try {
    const apiUrl = constructBibleApiUrl(
      version as string,
      book as string,
      parseInt(chapter as string)
    );
    console.log("api url: ", apiUrl);
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data, {
      status: 200,
    });
  } catch (error) {
    console.log("ERROR bruh: ", error);
    return NextResponse.json(
      { error: "Failed to get Bible Verse" },
      {
        status: 500,
      }
    );
  }
}
