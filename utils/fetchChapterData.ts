import axios, { AxiosResponse } from "axios";

// Interfaces
interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

import {
  saveDataToLocalStorage,
  getDataFromLocalStorage,
} from "../utils/localStorage";

export const fetchChapterData = async (
  key: string,
  params: ChapterData,
  setChapterData: (data: any) => void,
  setChapterCount: (count: number) => void,
  setBookName: (name: string) => void,
  setIsLoading: (newValue: boolean) => void
) => {
  // Context

  // TODO: Add a loading state and put it in context too
  setIsLoading(true);

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
      setChapterCount(chapterCountFromAPI.data);
      setBookName(response.data[0].book.name);
      console.log("Chapter Data not from local session: ", response.data);
      return response.data;
    }
  } catch (error) {
    console.error("Error fetching verse data:", error);
  } finally {
    setIsLoading(false);
  }
};
