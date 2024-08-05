"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

import { getDataFromLocalStorage } from "@/lib/utils/localStorage";

interface CurrentBookDataValue {
  chapterCount: number;
  setChapterCount: (newValue: number) => void;
  bibleVersion: string;
  setBibleVersion: (newValue: string) => void;
  bookName: string;
  setBookName: (newValue: string) => void;
  bookChapter: number;
  setBookChapter: (newValue: number) => void;
  chapterData: any;
  setChapterData: (newValue: any) => void;
  isLoading: boolean;
  setIsLoading: (newValue: boolean) => void;
  userId: string;
  setUserId: (newValue: string) => void;
}

const CurrentBookDataContext = createContext<CurrentBookDataValue | undefined>(
  undefined
);

interface CurrentBookDataContextProviderProps {
  children: ReactNode;
}

export const CurrentBookDataContextProvider: React.FC<
  CurrentBookDataContextProviderProps
> = ({ children }) => {
  const previousBibleVersion: string =
    getDataFromLocalStorage("previousBibleVersion") ?? "NIV";

  const previousChapter: number =
    getDataFromLocalStorage("previousChapter") ?? 1;

  const previousBookName: string =
    getDataFromLocalStorage("previousBookName") ?? "Genesis";

  const [chapterCount, setChapterCount] = useState<number>(1);
  // TODO: this should be set to a value from local storage, and if it doesn't exist in local storage, then set it to this default value
  const [bibleVersion, setBibleVersion] = useState<string>("NIV");
  // TODO: this should be set to a value from local storage, and if it doesn't exist in local storage, then set it to this default value
  const [bookName, setBookName] = useState<string>("Genesis");
  // TODO: this should be set to a value from local storage, and if it doesn't exist in local storage, then set it to this default value
  const [bookChapter, setBookChapter] = useState<number>(1);
  const [chapterData, setChapterData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      chapterCount,
      setChapterCount,
      bibleVersion,
      setBibleVersion,
      bookName,
      setBookName,
      bookChapter,
      setBookChapter,
      chapterData,
      setChapterData,
      isLoading,
      setIsLoading,
      userId,
      setUserId,
    }),
    [
      chapterCount,
      setChapterCount,
      bibleVersion,
      setBibleVersion,
      bookChapter,
      setBookChapter,
      chapterData,
      setChapterData,
      isLoading,
      setIsLoading,
      userId,
      setUserId,
    ]
  );

  return (
    <CurrentBookDataContext.Provider value={contextValue}>
      {children}
    </CurrentBookDataContext.Provider>
  );
};

export const useCurrentBookDataContext = (): CurrentBookDataValue => {
  const context = useContext(CurrentBookDataContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
