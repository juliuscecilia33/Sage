"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

// Components
import Navbar from "./Navbar";
import Hero from "./Hero";

// Utilities
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../../utils/localStorage";

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
  const [chapterData, setChapterData] = useState<any>();
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
  } = useCurrentBookDataContext();

  console.log("user info: ", user);

  const fetchChapterData = async (key: string, params: ChapterData) => {
    try {
      // Attempt to get data from localStorage
      const storedData: any = getDataFromLocalStorage(key);
      const chapterCountFromLocalStorage: number = getDataFromLocalStorage(
        key + "-chapterCount"
      );

      if (storedData && chapterCountFromLocalStorage) {
        console.log("stored data from local session: ", storedData);
        setChapterData(storedData);
        setChapterCount(chapterCountFromLocalStorage);
        setBookName(storedData[0].book.name);

        saveDataToLocalStorage("previousBookName", storedData[0].book.name);
        saveDataToLocalStorage("previousChapter", params.chapter);
        saveDataToLocalStorage("previousBibleVersion", params.version);

        return storedData;
      } else {
        const response: AxiosResponse<any> = await axios.get(
          "/api/bible/getChapter",
          {
            params,
          }
        );

        const chapterCountFromAPI: AxiosResponse<any> = await axios.get(
          "/api/bible/getChapterCount",
          {
            params,
          }
        );

        console.log("chapter count", chapterCountFromAPI.data);

        setChapterData(response.data);
        saveDataToLocalStorage(key, response.data);
        saveDataToLocalStorage(key + "-chapterCount", chapterCountFromAPI.data);
        saveDataToLocalStorage("previousBookName", response.data[0].book.name);
        saveDataToLocalStorage("previousChapter", params.chapter);
        saveDataToLocalStorage("previousBibleVersion", params.version);
        setChapterCount(chapterCountFromAPI.data);
        setBookName(response.data[0].book.name);
        console.log("Chapter Data not from local session: ", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching verse data:", error);
    }
  };

  const generateKey = (
    version: string,
    bookId: string,
    chapter: number
  ): string => {
    return `${version}-${bookId}-${chapter}`;
  };

  useEffect(() => {
    if (getDataFromLocalStorage("previousBibleVersion")) {
      setBibleVersion(getDataFromLocalStorage("previousBibleVersion"));
    }

    if (getDataFromLocalStorage("previousChapter")) {
      setBookChapter(getDataFromLocalStorage("previousChapter"));
    }

    if (getDataFromLocalStorage("previousBookName")) {
      setBookName(getDataFromLocalStorage("previousBookName"));
    }

    const params: ChapterData = {
      version: bibleVersion,
      book: bookName,
      chapter: bookChapter,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    if (getDataFromLocalStorage(key + "-chapterCount")) {
      setChapterCount(getDataFromLocalStorage(key + "-chapterCount"));
    }

    setChapter(params.chapter);

    fetchChapterData(key, params);
  }, []);

  // useEffect(() => {

  //   const params: ChapterData = {
  //     version: bibleVersion,
  //     book: bookName,
  //     chapter: bookChapter,
  //   };
  //   const key = generateKey(params.version, params.book, params.chapter);

  //   setChapter(params.chapter);

  //   fetchChapterData(key, params);
  // }, [bibleVersion, bookName, bookChapter]);

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
