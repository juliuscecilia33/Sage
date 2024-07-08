import { IoLocate } from "react-icons/io5";
import { MdOutlineExpandMore } from "react-icons/md";
import { formatTimestamp } from "@/utils/dateUtils";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Dispatch, SetStateAction } from "react";

interface SideNote {
  id: number;
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
  console.log("note data: ", noteData);
  console.log("previousNotes: ", previousNotes);

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
          <button className="mr-2 text-[#B5B5B5]">
            <MdModeEditOutline size={20} />
          </button>
          <button className="text-[#B5B5B5]">
            <MdDelete size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Note;
