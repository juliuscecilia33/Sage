import { useState } from "react";
import { MdClose } from "react-icons/md";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { FaChevronDown } from "react-icons/fa";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

interface ModalProps {
  show: boolean;
  onClose: () => void;
}

const Modal = ({ show, onClose }: ModalProps) => {
  if (!show) return null;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [book, setBook] = useState("");
  const [chapter, setChapter] = useState<number>(0);
  const [verse, setVerse] = useState<number>(0);

  const { userId } = useCurrentBookDataContext();

  console.log("modal userid", userId);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const sideNoteData = {
      userId: "4de131d1-dcd7-4aff-95e5-3c8e2b132725", // Replace this with the actual user ID from Supabase auth
      title,
      description,
      book,
      chapter,
      verse,
    };

    const response = await fetch("/api/sideNotes/postSideNotes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sideNoteData),
    });

    if (response.ok) {
      console.log("pushed data", response);
      // Redirect or show a success message
      //   router.push("/da");
    } else {
      // Handle error
      console.error("Failed to create side note");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 p-16">
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
        <div className="flex flex-col rounded mt-4 mb-8 bg-white w-full px-6 pt-6 pb-10">
          <input
            className="mb-2 p-4 font-bold text-3xl text-black border-none outline-none focus:ring-0 placeholder:text-3xl placeholder:font-bold"
            id="title"
            name="title"
            type="text"
            placeholder="Untitled"
            required
          />
          <textarea
            className="h-40 p-4 font-medium text-md text-black border-none outline-none focus:ring-0 placeholder:text-md placeholder:font-medium resize-none"
            id="title"
            name="title"
            placeholder="Description"
            required
          />
        </div>
        <div className="flex items-center mb-8">
          <div className="flex flex-col">
            <p className="text-[#B5B5B5] font-light mb-2">
              Add to your Themes:
            </p>
            <div className="flex rounded bg-white px-2 py-3 mr-4 items-center">
              <button
                type="button"
                className={`${paragraphFont.className} mr-3 transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] flex justify-center items-center h-10 px-3 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
              >
                <div className="w-7 h-7 bg-blue-500 rounded mr-4"></div>
                Life And Growth
                <FaChevronDown className="ml-2" />
              </button>
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
            type="submit"
            className="transition inline-flex justify-center py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#956E60] hover:bg-[#7F5C4F]"
          >
            Add Note
          </button>
        </div>
      </div>
      <div className="bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-1/5 p-10">
        <h3 className="text-xl font-bold text-[#11181C]">Community Notes</h3>
      </div>
    </div>
  );
};

export default Modal;
