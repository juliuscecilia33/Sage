// components/Navbar.tsx
import { useState, useRef, FocusEvent } from "react";
import { paragraphFont, titleFont } from "@/utils/fonts";

type DropdownProps = {
  title: string;
  options: string[];
};

const Dropdown = ({ title, options }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);

  const handleMouseEnter = () => setIsOpen(true);
  const handleMouseLeave = () => setIsOpen(false);
  const handleButtonClick = () => setIsOpen((prev) => !prev);

  const handleBlur = (event: FocusEvent<HTMLUListElement>) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.relatedTarget as Node)
    ) {
      setIsOpen(false);
    }
  };

  return (
    <nav className="flex justify-center">
      <ul className="flex flex-wrap items-center font-medium text-sm">
        <li
          className={`${paragraphFont.className} relative flex items-center space-x-1 px-4 py-1.5 text-sm font-inter font-medium rounded-sm font-archivo bg-[#FBFCFD] text-[#B5B5B5] ml-3`}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <a
            className={`${paragraphFont.className}`}
            href="#0"
            aria-expanded={isOpen}
          >
            {title}
          </a>
          <button
            className="shrink-0 p-1"
            aria-expanded={isOpen}
            onClick={handleButtonClick}
          >
            <span className="sr-only">Show submenu for "Flyout Menu"</span>
            <svg
              className="w-3 h-3 fill-slate-500"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
            >
              <path d="M10 2.586L11.414 4 6 9.414.586 4 2 2.586l4 4z" />
            </svg>
          </button>
          {/* 2nd level menu */}
          {isOpen && (
            <ul
              ref={menuRef}
              className="origin-top-right absolute top-full left-1/2 -translate-x-1/2 bg-white border border-slate-200 p-2 rounded-lg shadow-xl"
              onBlur={handleBlur}
              tabIndex={-1}
            >
              <li>
                <button className="text-slate-800 hover:bg-slate-50 flex items-center p-2 w-full">
                  <span className="whitespace-nowrap">Priority Ratings</span>
                </button>
              </li>
              <li>
                <button className="text-slate-800 hover:bg-slate-50 flex items-center p-2 w-full">
                  <span className="whitespace-nowrap">Insights</span>
                </button>
              </li>
              <li>
                <button className="text-slate-800 hover:bg-slate-50 flex items-center p-2 w-full">
                  <span className="whitespace-nowrap">Item Mirror</span>
                </button>
              </li>
              <li>
                <button className="text-slate-800 hover:bg-slate-50 flex items-center p-2 w-full">
                  <span className="whitespace-nowrap">Support Center</span>
                </button>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Dropdown;
