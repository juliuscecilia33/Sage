import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
import { paragraphFont } from "@/lib/utils/fonts";
import { useCurrentBookDataContext } from "@/app/context/CurrentBookData";
import { getBookNamesArray } from "@/lib/utils/getBookId";
import BooksDropdown from "../Buttons/BooksDropdown";

const Navbar = () => {
  const { bookName } = useCurrentBookDataContext();

  const booksArray: string[] = getBookNamesArray();

  return (
    <div className="px-4 pt-4 flex flex-row w-full justify-between items-center">
      <button
        className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
        onClick={() => {}}
      >
        <FaChevronLeft className="mr-1" />
        Revelation
      </button>
      <BooksDropdown title={bookName} options={booksArray} action={null} />
      <button
        className={`${paragraphFont.className} transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border flex justify-center items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
      >
        Exodus
        <FaChevronRight className="ml-1" />
      </button>
    </div>
  );
};

export default Navbar;
