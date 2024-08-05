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
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

interface ModalProps {
  show: boolean;
  onClose: () => void;
  previousNotes: any;
  setNotes: SetSideNotesBook;
  toEdit: boolean;
  prevTitle: string;
  prevDescription: string;
  prevNoteId: string;
  userThemes: ThemeData[];
}

const Modal = ({
  show,
  onClose,
  previousNotes,
  setNotes,
  toEdit,
  prevTitle,
  prevDescription,
  prevNoteId,
  userThemes,
}: ModalProps) => {
  const { userId } = useCurrentBookDataContext();

  if (!show) return null;

  const [title, setTitle] = useState(prevTitle ? prevTitle : "");
  const [description, setDescription] = useState(
    prevDescription ? prevDescription : ""
  );
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState<number>(0);
  const [verse, setVerse] = useState<number>(0);
  const [userTheme, setUserTheme] = useState<string>("");
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [workspaceId, setwWorkspaceId] = useState<any>(null);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  console.log("user themes from modal", userThemes);

  console.log("modal userid", userId);

  const handleEditSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const sideNoteData = {
      userId,
      title,
      description,
      book,
      chapter,
      verse,
      userTheme,
      isPrivate,
      workspaceId,
    };

    editSideNotesBook({ onClose, setNotes, prevNoteId, sideNoteData });
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const sideNoteData = {
      userId,
      title,
      description,
      book,
      chapter,
      verse,
      userTheme,
      isPrivate,
      workspaceId,
    };

    postSideNotesBook({ onClose, setNotes, previousNotes, sideNoteData });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 p-16">
        <div className="flex justify-between items-center">
          <div className={`flex items-center`}>
            <h3 className="text-3xl font-bold text-[#11181C]">
              {toEdit ? "Edit Your Note" : "Create A Note"}
            </h3>
            <button
              className={`${paragraphFont.className} ml-3 border border-[#956E60] flex justify-center items-center px-3 py-1.5 text-sm font-medium rounded font-archivo bg-[#FEF2EE] text-[#956E60]`}
            >
              Genesis
            </button>
          </div>
          <button
            onClick={onClose}
            className="transition text-gray-400 hover:text-gray-600"
          >
            <MdClose size={30} />
          </button>
        </div>
        <div className="flex flex-col rounded mt-4 mb-8 bg-white w-full px-6 pt-6 pb-10">
          <input
            className="mb-2 p-4 font-bold text-3xl text-black border-none outline-none focus:ring-0 placeholder:text-3xl placeholder:font-bold"
            id="title"
            name="title"
            type="text"
            placeholder="Untitled"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
          <textarea
            className="h-40 p-4 font-medium text-md text-black border-none outline-none focus:ring-0 placeholder:text-md placeholder:font-medium resize-none"
            id="title"
            name="title"
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </div>
        <div className="flex items-center mb-8">
          <div className="flex flex-col">
            <p className="text-[#B5B5B5] font-light mb-2">
              Add to your Themes:
            </p>
            <div className="relative flex rounded bg-white px-2 py-3 mr-4 items-center">
              <button
                type="button"
                id="dropdownDefaultButton"
                onClick={toggleDropdown}
                className={`${paragraphFont.className} mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] flex justify-center items-center h-10 px-3 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
              >
                <div className="w-7 h-7 bg-blue-500 rounded mr-4"></div>
                Life And Growth
                {isOpen ? (
                  <FaChevronUp className="ml-2" />
                ) : (
                  <FaChevronDown className="ml-2" />
                )}
              </button>
              {isOpen && (
                <div
                  id="dropdown"
                  className={`z-10 absolute bottom-full mb-2 right-0 w-44 bg-white divide-y divide-gray-200 rounded-lg shadow-md transition-opacity duration-300 ease-in-out ${
                    isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                  aria-labelledby="dropdownDefaultButton"
                >
                  <ul className="py-2 text-sm text-gray-700">
                    {userThemes.map((theme, key) => (
                      <li key={key}>
                        <button
                          onClick={() => {}} // set userTheme to theme.id
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          {theme.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#B5B5B5] font-light mb-2">Options:</p>
            <div className="flex rounded bg-white px-3 py-3">
              <button
                type="button"
                className={`${paragraphFont.className} mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] flex justify-center items-center h-10 px-6 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
              >
                Private
                <FaChevronDown className="ml-2" />
              </button>
              <button
                type="button"
                className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] flex justify-center items-center h-10 px-6 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
              >
                Add To
                <FaChevronDown className="ml-2" />
              </button>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="transition mr-2 inline-flex justify-center py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={toEdit ? handleEditSubmit : handleSubmit}
            className="transition inline-flex justify-center py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#956E60] hover:bg-[#7F5C4F]"
          >
            {toEdit ? "Apply Changes" : "Add Note"}
          </button>
        </div>
      </div>
      {!toEdit ? (
        <div className="bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-1/5 p-10">
          <h3 className="text-xl font-bold text-[#11181C]">Community Notes</h3>
        </div>
      ) : null}
    </div>
  );
};

export default Modal;
