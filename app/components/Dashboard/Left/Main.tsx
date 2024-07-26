import React, { useState, useEffect } from "react";

import { paragraphFont, titleFont } from "@/utils/fonts";
import { logout } from "@/app/logout/actions";
import ThemesModal from "../../Themes/CreateModal";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";

const LeftSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

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
          <button onClick={openModal} className="text-[#956E60] text-base">
            Add
          </button>
          <ThemesModal show={showModal} onClose={closeModal} />
        </div>
        <div className="mt-3 mb-1 w-full flex justify-between bg-[#FBFCFD] p-3">
          <div className="w-[83%] flex justify-start items-center text-sm">
            <div className="w-6 h-6 rounded bg-[#B7C467] mr-3"></div>
            <h3 className="truncate text-[#B7C467] text-medium">
              Life and Growth
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
        <div className="w-full flex justify-between p-3">
          <div className="w-[83%] flex justify-start items-center text-sm">
            <div className="w-6 h-6 rounded bg-[#B7C467] mr-3"></div>
            <h3 className="truncate text-[#B7C467] text-medium">
              Life and Growth
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
