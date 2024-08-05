import { paragraphFont, titleFont } from "@/lib/utils/fonts";
import { Dispatch, SetStateAction } from "react";

import { IoIosCreate } from "react-icons/io";

import Note from "../../SideNotes/Note";
import Modal from "../../SideNotes/Modal";

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
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

type RightSectionProps = {
  openModal: () => void;
  showModal: boolean;
  closeModal: () => void;
  sideNotesBook: any;
  setSideNotesBook: SetSideNotesBook;
  userThemes: ThemeData[];
};

const RightSection = ({
  openModal,
  showModal,
  closeModal,
  sideNotesBook,
  setSideNotesBook,
  userThemes,
}: RightSectionProps) => {
  return (
    <div className={`w-[18%] h-full py-4 px-3 `}>
      <div className="w-full flex-col flex justify-center">
        <div className="w-full flex flex-row items-center mb-4">
          <button
            className={`${paragraphFont.className} mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5] w-1/2`}
          >
            Book
          </button>
          <button
            className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5] w-1/2`}
          >
            Chapter
          </button>
        </div>
        <button
          onClick={openModal}
          className={`${paragraphFont.className} w-full transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#FEF2EE] flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FEF2EE] text-[#956E60]`}
        >
          Add Note
          <IoIosCreate size={25} />
        </button>
        <Modal
          show={showModal}
          toEdit={false}
          onClose={closeModal}
          previousNotes={sideNotesBook}
          setNotes={setSideNotesBook}
          prevTitle={""}
          prevDescription={""}
          prevNoteId={""}
          userThemes={userThemes}
        />
        <p className="text-[#B5B5B5] text-left font-light my-4">Your Notes:</p>
        {sideNotesBook.map((note: any, key: any) => (
          <Note
            key={key}
            noteData={note}
            previousNotes={sideNotesBook}
            setNotes={setSideNotesBook}
            userThemes={userThemes}
          />
        ))}
      </div>
    </div>
  );
};

export default RightSection;
