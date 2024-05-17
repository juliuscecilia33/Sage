import { colors } from "../../styles/colors";
import { FaChevronDown } from "react-icons/fa";

type HeroProps = {
  bookTitle: string;
  chapterCount: number;
};

const Hero = ({ bookTitle, chapterCount }: HeroProps) => {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <h2 className="text-xl">{bookTitle}</h2>
      <div>
        <button
          className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.secondary}`}
        >
          Chapter ${chapterCount}
          <FaChevronDown className="ml-1" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
