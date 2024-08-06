"use client";

import React, { useState, useEffect } from "react";

// Components
import Navbar from "./Navbar";
import Hero from "./Hero";

// Utilities
import { colors } from "../../../lib/utils/colors";
import { paragraphFont, titleFont } from "@/lib/utils/fonts";

import { fetchChapterData } from "@/lib/utils/data/fetchChapterData";

import { generateKey } from "@/lib/utils/generate/generateKey";

// Context
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { getSideNotesBook } from "@/lib/utils/data/sideNotes/book/fetchSideNotesBook";
import LeftSection from "./Left/Main";
import RightSection from "./Right/Main";
import { getThemes } from "@/lib/utils/data/themes/fetchThemes";

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

  const [showModal, setShowModal] = useState(false);
  const [sideNotesBook, setSideNotesBook] = useState<any[]>([]);
  const [userThemes, setUserThemes] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // TODO: Migrate to hooks file
  useEffect(() => {
    const params: ChapterData = {
      version: bibleVersion,
      book: bookName,
      chapter: bookChapter,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    async function fetchSideNotesAndThemes() {
      try {
        const sideNotesData = await getSideNotesBook();
        const themesData = await getThemes();

        console.log("themes data: ", themesData);
        console.log("sideNotesData should be with themes: ", sideNotesData);

        setSideNotesBook(sideNotesData);
        setUserThemes(themesData);
      } catch (error) {
        setError("Failed to retrieve side notes");
        console.log("Failed to retrieve side notes");
      }
    }

    fetchSideNotesAndThemes();

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
      <LeftSection userThemes={userThemes} setUserThemes={setUserThemes} />
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
        userThemes={userThemes}
      />
    </div>
  );
}
