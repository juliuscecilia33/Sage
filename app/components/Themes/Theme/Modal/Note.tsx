import React, { useState } from "react";

import { formatTimestamp } from "@/lib/utils/dateUtils";
import Modal from "./Modal";

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

interface ModalProps {
  noteData: SideNote;
}

const Note = ({ noteData }: any) => {
  const formattedDate = formatTimestamp(noteData.createdAt);

  return (
    <div
      style={{ scrollSnapAlign: "start" }}
      className="rounded text-black p-4 w-[30%] bg-[#FBFCFD] flex flex-shrink-0 flex-col border border-[#956E60] mr-3"
    >
      <div className="w-full flex items-center justify-between">
        <div className="w-full flex items-center truncate">
          <p className="truncate font-semibold">{noteData.title}asdfasdf</p>
        </div>
        <p className="text-[#B5B5B5] text-left font-light my-4 ml-4">1:2</p>
      </div>
      <p className="truncate">{noteData.description}</p>
      <div className="flex justify-between items-center">
        <p className="text-[#B5B5B5] text-xs font-light my-4">
          {formattedDate}
        </p>
      </div>
    </div>
  );
};

export default Note;
