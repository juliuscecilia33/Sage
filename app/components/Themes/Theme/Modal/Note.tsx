import React, { useState } from "react";

import { formatTimestamp } from "@/utils/dateUtils";
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
      </div>
    </div>
  );
};

export default Note;
