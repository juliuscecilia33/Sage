import { FC } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont, titleFont } from "@/utils/fonts";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal = ({ show, onClose }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-1/2 p-10">
        <div className="flex justify-between items-center">
          <div className={`flex items-center`}>
            <h3 className="text-3xl font-bold text-[#11181C]">Create a Note</h3>
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
        <div className="flex flex-col rounded my-8 bg-white w-full px-10 pt-6 pb-10">
          <input
            className="mb-2 p-4 font-bold text-3xl text-black border-none outline-none focus:ring-0 placeholder:text-3xl placeholder:font-bold"
            id="title"
            name="title"
            type="text"
            placeholder="Untitled"
            required
          />
          <textarea
            className="p-4 font-medium text-md text-black border-none outline-none focus:ring-0 placeholder:text-md placeholder:font-medium resize-none"
            id="title"
            name="title"
            placeholder="Description"
            required
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="transition mr-2 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="transition inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#956E60] hover:bg-[#7F5C4F]"
          >
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
