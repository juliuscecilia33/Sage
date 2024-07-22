import React, { useState, useEffect } from "react";

import { paragraphFont, titleFont } from "@/utils/fonts";
import { logout } from "@/app/logout/actions";

const LeftSection = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-[18%] h-full py-4 px-3">
      <form
        className={`${paragraphFont.className} border-none outline-none w-full mb-5 transition flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FBFCFD] text-[#B5B5B5]`}
        onSubmit={(e: any) => handleSearch(e)}
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type Note, Verse"
          className="border-none outline-none"
        />
        <button type="submit">Search</button>
      </form>
      <form action={() => logout()} method="post">
        <button
          className={`${paragraphFont.className} w-full transition hover:border-[#956E60] hover:bg-[#FEF2EE] hover:text-[#956E60] border border-[#FEF2EE] flex justify-between items-center px-4 py-1.5 text-sm font-medium rounded bg-[#FEF2EE] text-[#956E60]`}
          type="submit"
        >
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default LeftSection;
