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

const Theme = ({ key, theme }: ThemeProps) => {
  return (
    <div key={key} className={`mt-3 mb-1 w-full flex justify-between p-3`}>
      <div className="w-[83%] flex justify-start items-center text-sm">
        <div className={`w-6 h-6 rounded ${theme.themeColor} mr-3`}></div>
        <h3
          className={`truncate text-medium`}
          style={{ color: extractHexColor(theme.themeColor) || "black" }}
        >
          {theme.name}
        </h3>
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
