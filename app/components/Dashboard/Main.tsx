"use client";

import React, { useState, useEffect } from "react";

// Components
import Navbar from "./Navbar";
import Hero from "./Hero";

// Utilities
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";

import { fetchChapterData } from "@/utils/fetchChapterData";

import { generateKey } from "@/utils/generateKey";

// Context
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { logout } from "@/app/logout/actions";

// Interfaces
interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

export default function Main({ user }: any) {
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
    setIsLoading,
    isLoading,
  } = useCurrentBookDataContext();

  useEffect(() => {
    const params: ChapterData = {
      version: bibleVersion,
      book: bookName,
      chapter: bookChapter,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    fetchChapterData(
      key,
      params,
      setChapterData,
      setChapterCount,
      setBookName,
      setIsLoading,
      setBookChapter,
      setBibleVersion
    );
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
        <form action={() => logout()} method="post">
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
            {!isLoading && chapterData
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
