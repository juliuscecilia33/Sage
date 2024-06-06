// components/Navbar.tsx
import { useState, useRef, FocusEvent } from "react";
import { paragraphFont, titleFont } from "@/utils/fonts";

type DropdownProps = {
  title: string;
  options: string[];
  action: any;
};

const Dropdown = ({ title, options, action }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left ml-5">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {title}
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-60 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="p-3 grid grid-cols-3 gap-2">
            {options.map((chapter, index) => (
              <button
                key={index}
                className="w-full text-center px-2 py-1 hover:bg-gray-100 rounded-md"
                onClick={() => {
                  console.log(`Selected: ${chapter}`);
                  setIsOpen(false);
                }}
              >
                {chapter}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
