import { paragraphFont } from "@/utils/fonts";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { sampleNotes } from "@/utils/data/sideNotes/sampleNotes";
import Note from "./Note";
import { books } from "@/utils/data/books/sampleBooks";

interface ThemeData {
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

interface NoteData {
  id: string;
  title: string;
  description: string;
  book: string;
  verse: string;
  userTheme: string;
  isPrivate: boolean;
  workspaceId: string;
  createdAt: Date;
  updatedAt: Date;
}

type SetUserThemes = Dispatch<SetStateAction<ThemeData[]>>;

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const ThemeModal = ({ onClose, show }: ModalProps) => {
  const scrollNotesRef = useRef<HTMLDivElement>(null);
  const scrollBooksRef = useRef<HTMLDivElement>(null);

  const scrollNotesRight = () => {
    if (scrollNotesRef.current) {
      scrollNotesRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollNotesLeft = () => {
    if (scrollNotesRef.current) {
      scrollNotesRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollBooksRight = () => {
    if (scrollBooksRef.current) {
      scrollBooksRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollBooksLeft = () => {
    if (scrollBooksRef.current) {
      scrollBooksRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-4/5 p-12">
        <div className="flex justify-between items-center mb-5">
          <div className={`flex items-center`}>
            <h3 className="text-2xl font-bold text-[#C467AA]">
              God, Jesus, Holy Spirit
            </h3>
          </div>
          <button
            onClick={onClose}
            className="transition text-gray-400 hover:text-gray-600"
          >
            <MdClose size={30} />
          </button>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-1/4 mr-10">
            <div className="flex flex-col w-full justify-center p-5 bg-white rounded-lg border-2 border-[#C467AA] mb-5">
              <p className="text-base text-[#B5B5B5] mb-3 text-left">
                Description
              </p>
              <p className="text-base text-[#B5B5B5] mb-3 text-black text-left">
                And God said, Let there be a firmament in the midst of the
                waters, and let it divide the waters from the waters.
              </p>
              <p className="text-base text-[#B5B5B5] mb-3 text-left">
                Created At
              </p>
              <p className="text-base text-[#B5B5B5] mb-3 text-black text-left">
                07/31/2024
              </p>
            </div>
            <div className="w-full flex justify-between">
              <button
                onClick={() => {}}
                className="rounded-lg w-20 h-20 flex justify-center items-center bg-white"
              >
                <FaRegEdit className="text-[#B5B5B5]" size={25} />
              </button>
              <button
                onClick={() => {}}
                className="rounded-lg w-20 h-20 flex justify-center items-center bg-white"
              >
                <FaRegTrashCan className="text-[#B5B5B5]" size={25} />
              </button>
              <button
                onClick={() => {}}
                className="rounded-lg w-20 h-20 flex justify-center items-center bg-white"
              >
                <FaEye className="text-[#B5B5B5]" size={25} />
              </button>
            </div>
          </div>
          <div className="flex flex-col w-3/4">
            <div className="w-full mb-3 p-6 bg-white flex flex-col justify-center">
              <h3 className="text-black text-lg mb-2">Notes</h3>
              <div className="w-full flex px-3 py-3">
                <button
                  onClick={scrollNotesLeft}
                  className="text-[#B5B5B5] mr-5"
                >
                  <FaChevronLeft size={20} />
                </button>
                <div
                  ref={scrollNotesRef}
                  style={{ scrollSnapType: "x mandatory" }}
                  className="scrollbar-hide flex overflow-x-auto scrollbar-hide space-x-4 items-center w-full"
                >
                  {sampleNotes.map((note: any, key: any) => (
                    <Note noteData={note} />
                  ))}
                </div>
                <button
                  onClick={scrollNotesRight}
                  className="ml-5 text-[#B5B5B5]"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
            <div className="w-full p-4 bg-white flex flex-col justify-center">
              <h3 className="text-black text-lg">Books</h3>
              <div className="w-full flex px-3 py-3">
                <button
                  onClick={scrollBooksLeft}
                  className="text-[#B5B5B5] mr-5"
                >
                  <FaChevronLeft size={20} />
                </button>
                <div
                  ref={scrollBooksRef}
                  style={{ scrollSnapType: "x mandatory" }}
                  className="scrollbar-hide flex overflow-x-auto scrollbar-hide space-x-4 items-center w-full"
                >
                  {books.slice(0, 10).map((book: any, key: any) => (
                    <div
                      key={key}
                      className="rounded-r-lg h-[250px] min-w-[150px] rounded-l-sm bg-[#B7C467] flex justify-center items-center p-4"
                    >
                      <p className="truncate">{book.name}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={scrollBooksRight}
                  className="ml-5 text-[#B5B5B5]"
                >
                  <FaChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
