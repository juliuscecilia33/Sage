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
import { logout } from "@/app/logout/actions";
import { IoIosCreate } from "react-icons/io";
import Modal from "../SideNotes/Modal";
import { getSideNotesBook } from "@/utils/data/sideNotes/book/fetchSideNotesBook";
import Note from "../SideNotes/Note";

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
      <div className="w-[18%] h-full py-4 px-3">
        <form action={() => logout()} method="post">
          <button
            className={`${paragraphFont.className} w-full transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#FEF2EE] flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FEF2EE] text-[#956E60]`}
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
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
      <div className={`w-[18%] h-full py-4 px-3 `}>
        <div className="w-full flex-col flex justify-center">
          <div className="w-full flex flex-row items-center mb-4">
            <button
              className={`${paragraphFont.className} mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5] w-1/2`}
            >
              Book
            </button>
            <button
              className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5] w-1/2`}
            >
              Chapter
            </button>
          </div>
          <button
            onClick={openModal}
            className={`${paragraphFont.className} w-full transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#FEF2EE] flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FEF2EE] text-[#956E60]`}
          >
            Add Note
            <IoIosCreate size={25} />
          </button>
          <Modal
            show={showModal}
            toEdit={false}
            onClose={closeModal}
            previousNotes={sideNotesBook}
            setNotes={setSideNotesBook}
            prevTitle={""}
            prevDescription={""}
            prevNoteId={""}
          />
          <p className="text-[#B5B5B5] text-left font-light my-4">
            Your Notes:
          </p>
          {sideNotesBook.map((note) => (
            <Note
              noteData={note}
              previousNotes={sideNotesBook}
              setNotes={setSideNotesBook}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
