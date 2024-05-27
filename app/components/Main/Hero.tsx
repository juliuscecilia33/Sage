import { colors } from "../../../utils/colors";

// Icons
import { FaChevronDown } from "react-icons/fa";
import { IoMdUndo } from "react-icons/io";
import { IoMdRedo } from "react-icons/io";
import { FaBookBible } from "react-icons/fa6";
import { CgNotes } from "react-icons/cg";
import { MdStickyNote2 } from "react-icons/md";

type HeroProps = {
  bookTitle: string;
  chapterCount: number;
};

const Hero = ({ bookTitle, chapterCount }: HeroProps) => {
  return (
    <div className="flex flex-col mt-4 pb-4 px-4 border-b border-[#F0F0F0]">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="font-semibold text-3xl text-black font-archivo">
          {bookTitle}
        </h2>
        <div className="flex flex-row items-center">
          <button
            className={`flex justify-center items-center px-4 mr-3 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.secondary}`}
          >
            ESV
            <FaChevronDown className="ml-1" />
          </button>
          <button
            className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.secondary}`}
          >
            Chapter {chapterCount}
            <FaChevronDown className="ml-1" />
          </button>
        </div>
      </div>
      <div className="mt-4 flex flex-row w-full justify-between items-center">
        <div className="flex flex-row items-center">
          <button className="text-[#956E60] mr-5">
            <IoMdUndo size={20} />
          </button>
          <button className="text-[#B5B5B5] pr-5 border-r border-[#F0F0F0]">
            <IoMdRedo size={20} />
          </button>
          <button className="flex flex-row items-center font-medium px-5 border-r border-[#F0F0F0] font-archivo text-[#956E60]">
            <p>Helvetica</p>
            <FaChevronDown className="ml-2" />
          </button>
          <button className="flex flex-row items-center font-medium px-5 border-r border-[#F0F0F0] font-archivo text-[#956E60]">
            <MdStickyNote2 className="mr-2" size={28} />
            <p>Sticky</p>
          </button>
        </div>
        <div className="flex flex-row items-center">
          <button
            className={`mr-3 border border-[#956E60] flex justify-center items-center p-1.5 text-sm font-inter font-medium rounded font-archivo bg-[#FEF2EE] text-[#956E60]`}
          >
            <FaBookBible size={20} />
          </button>
          <button
            className={`transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#B5B5B5] flex justify-center items-center p-1.5 text-sm font-inter font-medium rounded font-archivo bg-[#FBFCFD] text-[#B5B5B5]`}
          >
            <CgNotes size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
