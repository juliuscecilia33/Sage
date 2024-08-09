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
}

const NoteModal = ({ onClose, show }: ModalProps) => {
  if (!show) return null;
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
                  <FaRegEdit className="text-[#B5B5B5]" size={20} />
                </button>
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

          <div className="flex flex-col w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
