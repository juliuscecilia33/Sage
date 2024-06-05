import { FaChevronRight, FaChevronLeft, FaChevronDown } from "react-icons/fa";
import { colors } from "../../../utils/colors";
import { paragraphFont, titleFont } from "@/utils/fonts";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";

const Navbar = () => {
  const { bookName } = useCurrentBookDataContext();

  return (
    <div className="px-4 pt-4 flex flex-row w-full justify-between items-center">
      <button
        className={`${paragraphFont.className} flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FEF2EE] text-[#956E60]`}
      >
        <FaChevronLeft className="mr-1" />
        Revelation
      </button>
      <button
        className={`${paragraphFont.className} flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FBFCFD] text-[#B5B5B5]`}
      >
        {bookName}
        <FaChevronDown className="ml-1" />
      </button>
      <button
        className={`${paragraphFont.className} flex justify-center items-center px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FEF2EE] text-[#956E60]`}
      >
        Exodus
        <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
};

export default Navbar;
