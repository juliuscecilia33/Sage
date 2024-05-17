import { FaChevronRight, FaChevronLeft, FaChevronDown } from "react-icons/fa";
import { colors } from "../../styles/colors";

const Navbar = () => {
  return (
    <div className="flex flex-row w-full justify-between items-center">
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.default}`}
      >
        <FaChevronLeft className="mr-1" />
        Revelation
      </button>
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.secondary}`}
      >
        Genesis
        <FaChevronDown className="ml-1" />
      </button>
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo ${colors.button.default}`}
      >
        Exodus
        <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
};

export default Navbar;
