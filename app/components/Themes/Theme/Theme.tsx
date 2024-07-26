import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const Theme = () => {
  return (
    <div className="w-full flex justify-between p-3">
      <div className="w-[83%] flex justify-start items-center text-sm">
        <div className="w-6 h-6 rounded bg-[#B7C467] mr-3"></div>
        <h3 className="truncate text-[#B7C467] text-medium">Life and Growth</h3>
      </div>
      <div className="w-[17%] flex justify-between items-center">
        <button>
          <FaRegEdit className="text-[#B5B5B5]" size={15} />
        </button>
        <button>
          <FaRegTrashCan className="text-[#B5B5B5]" size={15} />
        </button>
      </div>
    </div>
  );
};

export default Theme;
