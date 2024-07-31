import React, { useState, useEffect, Dispatch, SetStateAction } from "react";

import { paragraphFont } from "@/utils/fonts";
import { logout } from "@/app/logout/actions";
import ThemesModal from "../../Themes/CreateModal";
import Theme from "../../Themes/Theme/Theme";
import ThemeModal from "../../Themes/Theme/Modal/Modal";

interface ThemeData {
  userId: string;
  name: string;
  description: string;
  themeColor: string;
  notesCount: number;
  workspaceId: string;
}

type SetUserThemes = Dispatch<SetStateAction<ThemeData[]>>;

interface LeftSectionProps {
  userThemes: ThemeData[];
  setUserThemes: SetUserThemes;
}

const LeftSection = ({ userThemes, setUserThemes }: LeftSectionProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showThemesModal, setShowThemesModal] = useState(false);
  const [showThemeModal, setShowThemeModal] = useState(false);

  const openThemesModal = () => setShowThemesModal(true);
  const closeThemesModal = () => setShowThemesModal(false);

  const openThemeModal = () => setShowThemeModal(true);
  const closeThemeModal = () => setShowThemeModal(false);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  console.log("theme data from main: ", userThemes);

  return (
    <div className="w-[18%] h-full py-4">
      <div className="w-full border-b border-[#F0F0F0] pb-2 px-3">
        <form
          className={`${paragraphFont.className} outline-none w-full mb-5 transition flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
          onSubmit={(e: any) => handleSearch(e)}
        >
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type Note, Verse"
            className="border-none outline-none p-2"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="flex flex-col w-full px-3">
        <div className="w-full flex justify-between">
          <p className="text-[#B5B5B5] text-base text-left font-light my-4">
            Themes Key
          </p>
          <button
            onClick={openThemesModal}
            className="text-[#956E60] text-base"
          >
            Add
          </button>
          <ThemesModal
            previousThemes={userThemes}
            show={showThemesModal}
            onClose={closeThemesModal}
            setThemes={setUserThemes}
          />
        </div>
        {userThemes.map((theme: ThemeData, key: any) => (
          <Theme key={key} theme={theme} openThemeModal={openThemeModal} />
        ))}
        <ThemeModal onClose={closeThemeModal} show={showThemeModal} />
        <form action={() => logout()} method="post">
          <button
            className={`mt-10 ${paragraphFont.className} w-full transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#FEF2EE] flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FEF2EE] text-[#956E60]`}
            type="submit"
          >
            Sign Out
          </button>
        </form>
      </div>
    </div>
  );
};

export default LeftSection;
