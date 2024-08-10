import { useState, Dispatch, SetStateAction } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont } from "@/lib/utils/fonts";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";

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
  id: string;
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetSideNotesBook = Dispatch<SetStateAction<SideNote[]>>;

interface ModalProps {
  onClose: () => void;
  show: boolean;
  userThemes: ThemeData[];
  prevTitle: string;
  prevDescription: string;
  noteId: string;
  previousThemeId: string;
  previousNotes: any;
  dateCreated: string;
  previousThemeColor: string;
}

const NoteModal = ({
  onClose,
  show,
  userThemes,
  prevTitle,
  prevDescription,
  noteId,
  previousThemeId,
  previousNotes,
  dateCreated,
  previousThemeColor,
}: ModalProps) => {
  if (!show) return null;

  const [title, setTitle] = useState(prevTitle);
  const [description, setDescription] = useState(prevDescription);

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
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-4/5 p-16">
        <div className="flex justify-between items-center mb-5">
          <div className={`flex items-center`}>
            <h3 className="text-2xl font-bold text-black">Your Note</h3>
          </div>
          <button
            onClick={onClose}
            className="transition text-gray-400 hover:text-gray-600"
          >
            <MdClose size={30} />
          </button>
        </div>
        <div className="flex w-full">
          <div className="flex flex-col w-1/4 mr-10">
            <div className="w-full bg-white rounded flex flex-col mb-3  p-5">
              <button
                className={`${paragraphFont.className} mb-10 mr-auto border border-[#956E60] flex justify-center items-center px-3 py-1.5 text-sm font-medium rounded font-archivo bg-[#FEF2EE] text-[#956E60]`}
              >
                Genesis
              </button>
              <p className="text-base text-[#B5B5B5] mb-3 text-left">Verse</p>
              <p
                className={`${paragraphFont.className} text-md readerDescription mb-8`}
              >
                <span className="text-[#B7C467] text-md">2:1</span> In the
                beginning God (Elohim) created [by forming from nothing] the
                heavens and the earth.
              </p>
              <p className="text-base text-[#B5B5B5] mb-3 text-left">
                Created At
              </p>
              <p className="text-base text-[#B5B5B5] mb-3 text-black text-left">
                07/31/2024
              </p>
            </div>
            <div className="w-full rounded flex flex-col">
              <div className="w-full flex justify-left items-center">
                <button
                  onClick={() => {}}
                  className="rounded-lg w-12 h-12 mr-5 flex justify-center items-center bg-white"
                >
                  <FaRegTrashCan className="text-[#B5B5B5]" size={20} />
                </button>
                <button
                  onClick={() => {}}
                  className="rounded-lg w-12 h-12 flex justify-center items-center bg-white"
                >
                  <FaEye className="text-[#B5B5B5]" size={20} />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col w-3/4">
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
                    className={`${paragraphFont.className} truncate mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] flex justify-center items-center h-10 px-3 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
                  >
                    <div
                      className={`w-7 h-7 ${selectedThemeColor} rounded mr-4`}
                    ></div>
                    {selectedThemeName}
                    {isOpen ? (
                      <FaChevronUp className="ml-2" />
                    ) : (
                      <FaChevronDown className="ml-2" />
                    )}
                  </button>
                  {isOpen && (
                    <div
                      id="dropdown"
                      className={`z-10 absolute bottom-full mb-2 right-0 min-w-52 bg-white divide-y divide-gray-200 rounded-lg shadow-md transition-opacity duration-300 ease-in-out ${
                        isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                      }`}
                      aria-labelledby="dropdownDefaultButton"
                    >
                      <ul className="py-2 text-sm text-gray-700">
                        {userThemes.map((theme, key) => (
                          <li key={key}>
                            <button
                              onClick={() => {
                                setUserTheme(theme.id);
                                setSelectedThemeName(theme.name);
                                setSelectedThemeColor(theme.themeColor);
                                toggleDropdown();
                              }} // set userTheme to theme.id
                              className="text-left w-full block px-4 py-2 hover:bg-gray-100 flex items-center"
                            >
                              <div
                                className={`w-5 h-5 ${theme.themeColor} rounded mr-4`}
                              ></div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
