"use client";

import React, { useState, useEffect } from "react";

// Components
import Navbar from "./Navbar";
import Hero from "./Hero";

// Utilities
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";

import { fetchChapterData } from "@/utils/fetchChapterData";

// Context
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

// Interfaces
interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

interface ClientComponentProps {
  user: any;
}

export default function Main({ user }: ClientComponentProps) {
  // Use State
  const [chapter, setChapter] = useState<number>();

  // Context
  const {
    chapterCount,
    setChapterCount,
    bookName,
    setBookName,
    bibleVersion,
    bookChapter,
    setBibleVersion,
    setBookChapter,
    setChapterData,
    chapterData,
  } = useCurrentBookDataContext();

  console.log("user info: ", user);

  const generateKey = (
    version: string,
    bookId: string,
    chapter: number
  ): string => {
    return `${version}-${bookId}-${chapter}`;
  };

  useEffect(() => {
    const params: ChapterData = {
      version: bibleVersion,
      book: bookName,
      chapter: bookChapter,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    setChapter(params.chapter);

    fetchChapterData(key, params, setChapterData, setChapterCount, setBookName);
  }, [
    bibleVersion,
    bookName,
    bookChapter,
    setChapterData,
    setChapterCount,
    setBookName,
  ]);

  console.log("chapter data state: ", chapterData);
  console.log("chapter count context", chapterCount);
  console.log("chapter context", bookChapter);
  console.log("book name from context", bookName);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/6 bg-blue-500 h-full">
        <form action="/auth/signout" method="post">
          <button type="submit">Sign Out</button>
        </form>
      </div>
      <div className={`w-4/6 ${colors.primary.default}`}>
        <Navbar />
        <Hero />
        <div className={`w-full bg-[#FBFCFD] p-10 flex flex-col`}>
          <div className="px-[25%]">
            <h1 className={`${titleFont.className} readerTitle mb-3`}>
              Chapter {bookChapter}
            </h1>
            {chapterData
              ? chapterData.map((verse: any) => (
                  <p
                    className={`${paragraphFont.className} readerDescription mb-3`}
                    key={verse.id}
                  >
                    <span className="text-[#B7C467]">{verse.verseId}</span>{" "}
                    {verse.verse}
                  </p>
                ))
              : "Loading"}
          </div>
        </div>
      </div>
      <div className={`w-1/6 bg-blue-500 h-full`}>test</div>
    </div>
  );
}
