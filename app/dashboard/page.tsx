"use client";

import React, { useState, useEffect } from "react";
import { colors } from "../../utils/colors";
import Navbar from "../components/Main/Navbar";
import Hero from "../components/Main/Hero";
import axios, { AxiosResponse } from "axios";
import "@fontsource/archivo";

import { paragraphFont, titleFont } from "@/utils/fonts";

import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../../utils/localStorage";

interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

export default function Dashboard() {
  const [chapterData, setChapterData] = useState<any>();
  const [chapter, setChapter] = useState<number>();

  const fetchChapterData = async (key: string, params: ChapterData) => {
    try {
      // Try to get data from sessionStorage
      const storedData: any = getDataFromLocalStorage(key);
      if (storedData) {
        console.log("stored data from local session: ", storedData);
        setChapterData(storedData);
        return storedData;
      }
      const response: AxiosResponse<any> = await axios.get(
        "/api/bible/getChapter",
        {
          params,
        }
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
      version: "en-kjv",
      book: "john",
      chapter: 4,
    };
    const key = generateKey(params.version, params.book, params.chapter);

    setChapter(params.chapter);

    fetchChapterData(key, params);
  }, []);

  console.log("chapter data state: ", chapterData);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/6 bg-blue-500 h-full">test</div>
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
