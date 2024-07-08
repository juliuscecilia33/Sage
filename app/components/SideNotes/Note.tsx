import { useState } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { IoLocate } from "react-icons/io5";
import { MdExpand } from "react-icons/md";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { formatTimestamp } from "@/utils/dateUtils";

const Note = ({ noteData }: any) => {
  const formattedDate = formatTimestamp(noteData.createdAt);
  console.log("note date: ", noteData.title);

  return (
    <div className="rounded text-black w-full px-4 bg-[#FBFCFD] flex flex-col border border-[#956E60] mb-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
          <p>{noteData.title}</p>
        </div>
        <p className="text-[#B5B5B5] text-left font-light my-4">1:2</p>
      </div>
      <p>{noteData.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-[#B5B5B5] text-xs font-light my-4">
          {formattedDate}
        </p>
        <div className="flex items-center">
          <IoLocate className="mr-2" />
          <MdExpand />
        </div>
      </div>
    </div>
  );
};

export default Note;
