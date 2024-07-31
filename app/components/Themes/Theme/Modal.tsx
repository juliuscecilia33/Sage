import { paragraphFont } from "@/utils/fonts";
import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { postTheme } from "@/utils/data/themes/postTheme";
import { extractHexColor } from "@/utils/extractHexColor";

interface ThemeData {
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetUserThemes = Dispatch<SetStateAction<ThemeData[]>>;

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const ThemeModal = ({ onClose, show }: ModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 p-12">
        <div className="flex justify-between items-center">
          <div className={`flex items-center`}>
            <h3 className="text-2xl font-bold text-[#11181C]">Your Theme</h3>
          </div>
          <button
            onClick={onClose}
            className="transition text-gray-400 hover:text-gray-600"
          >
            <MdClose size={30} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ThemeModal;
