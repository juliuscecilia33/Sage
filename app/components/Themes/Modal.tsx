import { paragraphFont } from "@/utils/fonts";
import React, { useRef, useState } from "react";
import { MdClose } from "react-icons/md";
import { FaRegEdit, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

interface ModalProps {
  onClose: () => void;
  show: boolean;
}

const ThemesModal = ({ onClose, show }: ModalProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Context
  const { userId } = useCurrentBookDataContext();

  // States
  const [selectedColor, setSelectedColor] = useState<number | null>(0);
  const [themeName, setThemeName] = useState<string>("");
  const [themeDescription, setThemeDescription] = useState<string>("");
  const [themeColor, setThemeColor] = useState<string>("");
  const [themeNotesCount, setThemeNotesCount] = useState<number>(0);
  const [workspaceId, setwWorkspaceId] = useState<any>(null);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const themeData = {
      userId,
      name: themeName,
      description: themeDescription,
      themeColor,
      notesCount: themeNotesCount,
      workspaceId,
    };

    // TODO: add input validator to check if values are not null

    try {
      // TODO: Add loading indicator on button

      const response = await fetch("/api/theme/user/postTheme", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(themeData),
      });

      if (response.ok) {
        const data = await response.json();

        if (data) {
          console.log("theme data inside the if condition", data);
        }

        onClose();
        // Redirect or show a success message
      } else {
        // Handle error
        console.error("Failed to create side note");
      }
    } catch (error) {
      console.error("Failed to update side note:", error);
    }
  };

  const buttonColors = [
    "bg-[#B7C467]",
    "bg-[#956E60]",
    "bg-[#6781C4]",
    "bg-[#C467AA]",
    "bg-[#FF6161]",
    "bg-[#C46772]",
    "bg-[#FF6196]",
    "bg-[#67C46B]",
    "bg-[#FFC961]",
  ];

  const sampleThemes = [
    {
      count: 26,
      name: "Worthy is your Name: Jesus",
    },
    {
      count: 2,
      name: "Dark",
    },
    {
      count: 22,
      name: "Brown",
    },
    {
      count: 1,
      name: "Black",
    },
    {
      count: 23,
      name: "Yelow",
    },
  ];

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="mr-5 bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-3/5 p-12">
        <div className="flex justify-between items-center">
          <div className={`flex items-center`}>
            <h3 className="text-2xl font-bold text-[#11181C]">Your Themes</h3>
          </div>
          <button
            onClick={onClose}
            className="transition text-gray-400 hover:text-gray-600"
          >
            <MdClose size={30} />
          </button>
        </div>
        <div className="my-5 w-full bg-white flex p-10">
          <button onClick={scrollLeft} className="text-[#B5B5B5] mr-5">
            <FaChevronLeft size={20} />
          </button>
          <div
            className="w-full scrollbar-hide flex overflow-x-auto scrollbar-hide space-x-4"
            ref={scrollRef}
            style={{ scrollSnapType: "x mandatory" }}
          >
            {sampleThemes.map((theme, key) => (
              <div
                key={key}
                style={{ scrollSnapAlign: "start" }}
                className="flex flex-shrink-0 flex-col items-center w-[20%]"
              >
                <div className="flex flex-col bg-[#B7C467] p-4 rounded w-full">
                  <div className="w-full flex justify-end mb-20">
                    <div className="w-10 h-10 aspect-square rounded-full flex justify-center items-center bg-white text-[#B7C467] font-bold text-sm">
                      {theme.count}
                    </div>
                  </div>
                  <h3 className="text-base font-bold text-white truncate">
                    {theme.name}
                  </h3>
                </div>
                <div className="flex justify-center items-center w-full mt-3">
                  <button>
                    <FaRegEdit className="mr-5 text-[#B5B5B5]" size={15} />
                  </button>
                  <button>
                    <FaRegTrashCan className="text-[#B5B5B5]" size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button onClick={scrollRight} className="ml-5 text-[#B5B5B5]">
            <FaChevronRight size={20} />
          </button>
        </div>
        <h3 className="text-2xl font-bold text-[#11181C] mb-5">
          Create a Theme
        </h3>
        <div className="flex w-full items-center mb-3">
          <input
            className="w-[25%] rounded-lg mr-5 py-6 px-6 font-light text-base text-black border-none outline-none focus:ring-0 placeholder:text-base placeholder:font-light"
            id="themeName"
            name="themeName"
            type="text"
            placeholder="Theme Name"
            onChange={(e) => {
              setThemeName(e.target.value);
            }}
            value={themeName}
            required
          />
          <div className="rounded-lg flex items-center space-x-2 bg-white p-4">
            {buttonColors.map((color, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedColor(index);
                  setThemeColor(color);
                }}
                className={`${color} w-10 h-10 rounded-full transition-opacity duration-300  ${
                  selectedColor === index ? "opacity-100" : "opacity-30"
                }`}
              />
            ))}
          </div>
        </div>
        <input
          className="mb-10 w-full rounded-lg py-6 px-6 font-light text-base text-black border-none outline-none focus:ring-0 placeholder:text-base placeholder:font-light"
          id="themeDescription"
          name="themeDescription"
          type="text"
          placeholder="Enter Description Here..."
          onChange={(e) => {
            setThemeDescription(e.target.value);
          }}
          value={themeDescription}
        />
        <div className="mt-5 w-full flex justify-between items-center">
          <button
            type="button"
            onClick={onClose}
            className="transition mr-2 inline-flex justify-center py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="transition inline-flex justify-center py-3 px-7 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#956E60] hover:bg-[#7F5C4F]"
          >
            Create Theme
          </button>
        </div>
      </div>
      <div className="bg-[#F9F9FA] rounded-lg overflow-hidden shadow-xl transform transition-all w-1/5 p-10">
        <h3 className="text-xl font-bold text-[#11181C]">Community Themes</h3>
      </div>
    </div>
  );
};

export default ThemesModal;
