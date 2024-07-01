import { useState } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

const Note = ({ noteData }: any) => {
  const { userId } = useCurrentBookDataContext();

  return (
    <div className="w-full p-2 bg-[#FBFCFD] flex flex-column">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-500 rounded-full mr-3"></div>
          <p>{noteData.title}</p>
        </div>
        <p className="text-[#B5B5B5] text-left font-light my-4">1:2</p>
      </div>
      <p>{noteData.description}</p>
    </div>
  );
};

export default Note;
