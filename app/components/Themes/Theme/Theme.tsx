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
  openThemeModal: any;
}

const Theme = ({ key, theme, openThemeModal }: ThemeProps) => {
  return (
    <button
      onClick={openThemeModal}
      key={key}
      className={`hover:bg-[#F6F6F6] transition duration-300 ease-in-out mt-3 mb-1 w-full flex items-center justify-between p-3`}
    >
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
    </button>
  );
};

export default Theme;
