"use client";

import React, { useState, useEffect } from "react";
import { colors } from "../utils/colors";
import Navbar from "../components/Main/Navbar";
import Hero from "@/components/Main/Hero";
import axios, { AxiosResponse } from "axios";

import { paragraphFont, titleFont } from "@/utils/fonts";

import {
  saveDataToSessionStorage,
  getDataFromSessionStorage,
} from "../utils/sessionStorage";

interface VerseData {
  book: string;
  chapter: number;
  verse: number;
  version: string;
}

export default function Index() {
  const [verseData, setVerseData] = useState<any>();

  const fetchVerseData = async (params: VerseData) => {
    try {
      const response: AxiosResponse<any> = await axios.get("/api/bible", {
        params,
      });
      setVerseData(response.data);
      console.log("Verse Data: ", response.data);
    } catch (error) {
      console.error("Error fetching verse data:", error);
    }
  };

  useEffect(() => {
    const params: VerseData = {
      version: "en-kjv",
      book: "john",
      chapter: 3,
      verse: 16,
    };
    fetchVerseData(params);
  }, []);

  return (
    <div className="flex w-full h-full">
      <div className="w-1/6 bg-blue-500 h-full">test</div>
      <div className={`w-4/6 ${colors.primary.default}`}>
        <Navbar />
        <Hero bookTitle="Genesis" chapterCount={6} />
        <div className={`w-full bg-[#FBFCFD] p-10`}>
          <h1 className={`${titleFont.className} readerTitle`}>Chapter 1</h1>
          <p className={`${paragraphFont.className} readerDescription`}>
            1 In the beginning God (Elohim) created [by forming from nothing]
            the heavens and the earth. 2 The earth was formless and void or a
            waste and emptiness, and darkness was upon the face of the deep
            [primeval ocean that covered the unformed earth]. The Spirit of God
            was moving (hovering, brooding) over the face of the waters. 3 And
            God said, “Let there be light”; and there was light. 4 God saw that
            the light was good (pleasing, useful) and He affirmed and sustained
            it; and God separated the light [distinguishing it] from the
            darkness. 5 And God called the light day, and the darkness He called
            night. And there was evening and there was morning, one day. 6 And
            God said, Let there be a firmament in the midst of the waters, and
            let it divide the waters from the waters. 7 And God made the
            firmament, and divided the waters which were under the firmament
            from the waters which were above the firmament: and it was so. 8 And
            God called the firmament Heaven. And the evening and the morning
            were the second day.
          </p>
        </div>
      </div>
      <div className={`w-1/6 bg-blue-500 h-full`}>test</div>
    </div>
  );
}
