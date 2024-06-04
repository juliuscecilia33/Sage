"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useMemo,
} from "react";

interface CurrentBookDataValue {
  chapterCount: number;
  setChapterCount: (newValue: number) => void;
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
  const [chapterCount, setChapterCount] = useState<number>(0);

  // Use useMemo to memoize the context value
  const contextValue = useMemo(
    () => ({
      chapterCount,
      setChapterCount,
    }),
    [chapterCount, setChapterCount]
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
