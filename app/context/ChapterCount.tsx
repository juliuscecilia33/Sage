import React, { createContext, useContext, useState, ReactNode } from "react";

interface ChapterCountValue {
  value: number;
  setValue: (newValue: number) => void;
}

const ChapterCountContext = createContext<ChapterCountValue | undefined>(
  undefined
);

interface ChapterCountContextProviderProps {
  children: ReactNode;
}

export const ChapterCountContextProvider: React.FC<
  ChapterCountContextProviderProps
> = ({ children }) => {
  const [value, setValue] = useState<number>(0);

  return (
    <ChapterCountContext.Provider value={{ value, setValue }}>
      {children}
    </ChapterCountContext.Provider>
  );
};

export const useChapterCountContext = (): ChapterCountValue => {
  const context = useContext(ChapterCountContext);
  if (!context) {
    throw new Error("useMyContext must be used within a MyContextProvider");
  }
  return context;
};
