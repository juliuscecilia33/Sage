import { FaChevronRight, FaChevronLeft, FaChevronDown } from "react-icons/fa";
import { colors } from "../../utils/colors";

const Navbar = () => {
  return (
    <div className="px-4 pt-4 flex flex-row w-full justify-between items-center">
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FEF2EE] text-[#956E60]`}
      >
        <FaChevronLeft className="mr-1" />
        Revelation
      </button>
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FBFCFD] text-[#B5B5B5]`}
      >
        Genesis
        <FaChevronDown className="ml-1" />
      </button>
      <button
        className={`flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FEF2EE] text-[#956E60]`}
      >
        Exodus
        <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
};

export default Navbar;
