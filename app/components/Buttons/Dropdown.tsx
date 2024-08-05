// components/Navbar.tsx
import { useState, useRef, FocusEvent } from "react";
import { paragraphFont, titleFont } from "@/lib/utils/fonts";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { fetchChapterData } from "@/lib/utils/data/fetchChapterData";
import { generateKey } from "@/lib/utils/generate/generateKey";

type DropdownProps = {
  title: string;
  options: string[];
  type: string;
};

// Interfaces
interface ChapterData {
  book: string;
  chapter: number;
  version: string;
}

const Dropdown = ({ title, options, type }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    setChapterCount,
    setBookName,
    bibleVersion,
    bookChapter,
    setChapterData,
    bookName,
    setIsLoading,
    setBookChapter,
    setBibleVersion,
  } = useCurrentBookDataContext();

  return (
    <div className="relative inline-block text-left ml-5 z-5">
      <div>
        <button
          type="button"
          className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
          <FaChevronDown className="ml-2" />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-3 grid grid-cols-3 gap-2">
            {options.map((option, index) => (
              <button
                key={index}
                className="w-full text-center px-2 py-1 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  console.log(`Selected: ${option}`);

                  if (type === "version") {
                    const params: ChapterData = {
                      version: option,
                      book: bookName,
                      chapter: bookChapter,
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
                  } else if (type === "chapter") {
                    const params: ChapterData = {
                      version: bibleVersion,
                      book: bookName,
                      chapter: Number(option),
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
                  }

                  setIsOpen(false);
                }}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
