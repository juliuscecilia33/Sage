// "use server";

import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

import { getBookId } from "@/lib/utils/getBookId";

import axios from "axios";

function constructBibleApiUrl(book: string): string {
  const baseUrl = "https://bible-go-api.rkeplin.com/v1/books/";

  const bookId = getBookId(book);

  return `${baseUrl}${bookId}/chapters`;
}

export async function GET(req: NextApiRequest) {
  const { searchParams } = new URL(req.url!);
  const book = searchParams.get("book");

  try {
    const apiUrl = constructBibleApiUrl(book as string);
    console.log("api url: ", apiUrl);
    const response = await axios.get(apiUrl);
    return NextResponse.json(response.data.length, {
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
