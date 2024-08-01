import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { extractHexColor } from "@/utils/extractHexColor";

interface ThemeData {
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

interface ThemeProps {
  key: string;
  theme: ThemeData;
}

const ThemeInModal = ({ theme, key }: ThemeProps) => {
  return (
    <div
      key={key}
      style={{ scrollSnapAlign: "start" }}
      className="flex flex-shrink-0 flex-col items-center w-[20%]"
    >
      <div className={`${theme.themeColor} flex flex-col p-4 rounded w-full`}>
        <div className="w-full flex justify-end mb-20">
          <div
            style={{
              color: extractHexColor(theme.themeColor) || "black",
            }}
            className="w-10 h-10 aspect-square rounded-full flex justify-center items-center bg-white font-bold text-sm"
          >
            {theme.notesCount}
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
  );
};

export default ThemeInModal;
