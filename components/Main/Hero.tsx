import { colors } from "../../styles/colors";
import { FaChevronDown } from "react-icons/fa";

type HeroProps = {
  bookTitle: string;
  chapterCount: number;
};

const Hero = ({ bookTitle, chapterCount }: HeroProps) => {
  return (
    <div className="flex flex-col mt-5">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="font-semibold text-2xl text-black ">{bookTitle}</h2>
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
    </div>
  );
};

export default Hero;
