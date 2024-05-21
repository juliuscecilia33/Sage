import { colors } from "../../styles/colors";
import { FaChevronDown } from "react-icons/fa";
import { IoMdUndo } from "react-icons/io";
import { IoMdRedo } from "react-icons/io";

type HeroProps = {
  bookTitle: string;
  chapterCount: number;
};

const Hero = ({ bookTitle, chapterCount }: HeroProps) => {
  return (
    <div className="flex flex-col mt-4">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="font-semibold text-3xl text-black ">{bookTitle}</h2>
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
          <div className="flex flex-row items-center font-medium px-5 border-r border-[#F0F0F0] font-archivo text-[#956E60]">
            <p>Helvetica</p>
            <FaChevronDown className="ml-2" />
          </div>
        </div>
        <button
          className={`border border-[#956E60] flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FEF2EE] text-[#956E60]`}
        >
          Exodus
        </button>
      </div>
    </div>
  );
};

export default Hero;
