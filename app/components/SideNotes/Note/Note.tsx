import React, { useState } from "react";

import { IoLocate } from "react-icons/io5";
import { formatTimestamp } from "@/lib/utils/dateUtils";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { handleDelete } from "@/lib/utils/data/sideNotes/book/deleteSideNotesBook";
import NoteModal from "./Modal";

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

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

interface ThemeData {
  id: string;
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

interface ModalProps {
  noteData: SideNote;
  previousNotes: SideNote[];
  setNotes: SetSideNotesBook;
  userThemes: ThemeData[];
}

const Note = ({ noteData, previousNotes, setNotes, userThemes }: any) => {
  const formattedDate = formatTimestamp(noteData.createdAt);
  const [showModal, setShowModal] = useState(false);
  console.log("note data: ", noteData);
  console.log("previousNotes: ", previousNotes);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  // change formatted date to updated date

  return (
    <>
      <div className="drop-shadow-sm rounded text-black w-full px-4 bg-[#FBFCFD] flex flex-col mb-3">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <div
              className={`w-3 h-3 ${noteData.theme.themeColor} rounded-sm mr-3`}
            ></div>
            <p className="font-semibold">{noteData.title}</p>
          </div>
          <p className="text-[#B5B5B5] text-left font-light my-4">1:2</p>
        </div>
        <p>{noteData.description}</p>
        <div className="flex justify-between items-center w-full">
          <p className="text-[#B5B5B5] text-xs font-light my-4">
            {formattedDate}
          </p>
          <div className="flex items-center">
            <button className="mr-2 text-[#B5B5B5]">
              <IoLocate size={20} />
            </button>
            <button onClick={openModal} className="mr-2 text-[#B5B5B5]">
              <MdModeEditOutline size={20} />
            </button>
            <button
              onClick={() => handleDelete(noteData.id, setNotes)}
              className="text-[#B5B5B5]"
            >
              <MdDelete size={20} />
            </button>
          </div>
        </div>
      </div>
      <NoteModal
        userThemes={userThemes}
        show={showModal}
        onClose={closeModal}
        dateCreated={formattedDate}
        setNotes={setNotes}
        noteData={noteData}
      />
    </>
  );
};

// Store the props for NoteModal and this component; make it look nicer
export default Note;
