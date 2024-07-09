import React, { useState } from "react";

import { IoLocate } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { formatTimestamp } from "@/utils/dateUtils";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";
import { handleDelete } from "@/utils/data/sideNotes/book/deleteSideNotesBook";
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

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

interface ModalProps {
  noteData: SideNote;
  previousNotes: SideNote[];
  setNotes: SetSideNotesBook; // TODO: SetSideNotesBook; Revise all types not to be "any"
}

const Note = ({ noteData, previousNotes, setNotes }: any) => {
  const formattedDate = formatTimestamp(noteData.createdAt);
  const [showModal, setShowModal] = useState(false);
  console.log("note data: ", noteData);
  console.log("previousNotes: ", previousNotes);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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
      <Modal
        show={showModal}
        toEdit={true}
        onClose={closeModal}
        previousNotes={previousNotes}
        setNotes={setNotes}
        prevTitle={noteData.title}
        prevDescription={noteData.description}
      />
    </div>
  );
};

export default Note;
