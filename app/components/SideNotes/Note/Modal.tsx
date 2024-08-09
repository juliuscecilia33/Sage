import { useState, Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont } from "@/lib/utils/fonts";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { postSideNotesBook } from "@/lib/utils/data/sideNotes/book/postSideNotesBook";
import { editSideNotesBook } from "@/lib/utils/data/sideNotes/book/editSideNotesBook";

interface SideNote {
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

interface ThemeData {
  id: string;
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const NoteModal = ({ onClose, show }: ModalProps) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 p-16">
        <div className="flex justify-between items-center mb-5">
          <div className={`flex items-center`}>
            <h3 className="text-2xl font-bold text-black">Your Note</h3>
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
            <button
              className={`${paragraphFont.className} ml-3 border border-[#956E60] flex justify-center items-center px-3 py-1.5 text-sm font-medium rounded font-archivo bg-[#FEF2EE] text-[#956E60]`}
            >
              Genesis
            </button>
          </div>
          <div className="flex flex-col w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
