"use client";

import React, { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";
import Navbar from "./Navbar";
import Hero from "./Hero";
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";
import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../../utils/localStorage";

interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

interface ClientComponentProps {
  user: any; // Define the user type more precisely if possible
}

export default function Main({ user }: ClientComponentProps) {
  const [chapterData, setChapterData] = useState<any>();
  const [chapter, setChapter] = useState<number>();

  console.log("user info: ", user);

  const fetchChapterData = async (key: string, params: ChapterData) => {
    try {
      // Try to get data from localStorage
      const storedData: any = getDataFromLocalStorage(key);
      if (storedData) {
        console.log("stored data from local session: ", storedData);
        setChapterData(storedData);
        return storedData;
      }
      const response: AxiosResponse<any> = await axios.get(
        "/api/bible/getChapter",
        { params }
      );

      setChapterData(response.data);
      saveDataToLocalStorage(key, response.data);
      console.log("Chapter Data not from local session: ", response.data);
      return response.data;
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
    const params: ChapterData = {
      version: "niv",
      book: "ecclesiastes",
      chapter: 1,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    setChapter(params.chapter);

    fetchChapterData(key, params);
  }, []);

  console.log("chapter data state: ", chapterData);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/6 bg-blue-500 h-full">
        <form action="/auth/signout" method="post">
          <button type="submit">Sign Out</button>
        </form>
      </div>
      <div className={`w-4/6 ${colors.primary.default}`}>
        <Navbar />
        <Hero bookTitle="Genesis" chapterCount={6} />
        <div className={`w-full bg-[#FBFCFD] p-10 flex flex-col`}>
          <div className="px-[25%]">
            <h1 className={`${titleFont.className} readerTitle mb-3`}>
              Chapter {chapter}
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
