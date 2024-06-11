// components/Navbar.tsx
import { useState, useRef, FocusEvent } from "react";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { fetchChapterData } from "@/utils/fetchChapterData";
import { generateKey } from "@/utils/generateKey";

type BooksDropdownProps = {
  title: string;
  options: string[];
  action: any;
};

// Interfaces
interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

const BooksDropdown = ({ title, options, action }: BooksDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    setChapterCount,
    setBookName,
    bibleVersion,
    bookChapter,
    setChapterData,
    setIsLoading,
    setBookChapter,
    setBibleVersion
  } = useCurrentBookDataContext();

  return (
    <div className="relative inline-block text-left ml-5 z-10">
      <div>
        <button
          type="button"
          className={`${paragraphFont.className} inline-flex justify-center items-center w-full rounded-md px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FBFCFD] text-[#B5B5B5]`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <FaChevronDown className="ml-2" />
        </button>
      </div>

      {isOpen && (
        <div
          className={`${paragraphFont.className} py-3 origin-top-center absolute left-1/2 transform -translate-x-1/2 mt-2 w-[50rem] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
        >
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              Recently Read
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              Old Testament
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="p-3 grid grid-cols-5 gap-3">
            {options.slice(0, 39).map((book, index) => (
              <button
                key={index}
                className="w-full text-center text-md px-2 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  console.log(`Selected: ${book}`);
                  setIsOpen(false);
                  setBookName(book);

                  const params: ChapterData = {
                    version: bibleVersion,
                    book: book,
                    chapter: 1,
                  };

                  const key = generateKey(
                    params.version,
                    params.book,
                    params.chapter
                  );

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
                }}
              >
                {book}
              </button>
            ))}
          </div>
          <div className="relative flex py-5 items-center">
            <div className="flex-grow border-t border-gray-400"></div>
            <span className="flex-shrink mx-4 text-gray-400">
              New Testament
            </span>
            <div className="flex-grow border-t border-gray-400"></div>
          </div>
          <div className="p-3 grid grid-cols-5 gap-3">
            {options.slice(40, 66).map((book, index) => (
              <button
                key={index}
                className="w-full text-center text-md px-2 py-2 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  console.log(`Selected: ${book}`);
                  setIsOpen(false);
                }}
              >
                {book}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksDropdown;
