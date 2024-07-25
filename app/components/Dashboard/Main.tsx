"use client";

import React, { useState, useEffect } from "react";

// Components
import Navbar from "./Navbar";
import Hero from "./Hero";

// Utilities
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";

import { fetchChapterData } from "@/utils/data/fetchChapterData";

import { generateKey } from "@/utils/generate/generateKey";

// Context
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { getSideNotesBook } from "@/utils/data/sideNotes/book/fetchSideNotesBook";
import LeftSection from "./Left/Main";
import RightSection from "./Right/Main";

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

  const [isBookSideNotes, setIsBookSideNotes] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [sideNotesBook, setSideNotesBook] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  useEffect(() => {
    const params: ChapterData = {
      version: bibleVersion,
      book: bookName,
      chapter: bookChapter,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    async function fetchSideNotes() {
      try {
        const data = await getSideNotesBook();
        setSideNotesBook(data);
      } catch (error) {
        setError("Failed to retrieve side notes");
        console.log("Failed to retrieve side notes");
      }
    }

    fetchSideNotes();

    // TODO: You can add to Recently Read dropdown

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
  console.log("sidenotes book: ", sideNotesBook);

  return (
    <div className="flex w-full h-full">
      <LeftSection />
      <div className={`w-[64%] ${colors.primary.default}`}>
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
      <RightSection
        openModal={openModal}
        showModal={showModal}
        closeModal={closeModal}
        sideNotesBook={sideNotesBook}
        setSideNotesBook={setSideNotesBook}
      />
    </div>
  );
}
