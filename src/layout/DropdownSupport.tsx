import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { MdOutlineQuestionMark } from "react-icons/md";

const DropdownSupport = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLAnchorElement | null>(null);
  const dropdown = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const clickHandler = ({ target }: any) => {
      if (!dropdown.current) return;
      if (trigger.current && trigger.current.contains(target)) {
        // Handle trigger click
        return;
      }
      if (dropdown.current.contains(target)) return;
      setDropdownOpen(false);
    };

    document.addEventListener("click", clickHandler);

    return () => {
      if (trigger.current) {
        document.removeEventListener("click", clickHandler);
      }
    };
  }, [setDropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: any) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, []);

  return (
    <li className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        to="#"
        className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-700 border-[0.5px] border-stroke bg-white dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        

        <MdOutlineQuestionMark size={18} />
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-27 mt-2.5 flex h-auto w-40 flex-col rounded-xl bg-white shadow-2 dark:border-strokedark dark:bg-boxdark sm:right-0 ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >

        <ul className="flex h-auto flex-col overflow-y-auto custom-scrollbar">
          <li
            onClick={() => {}}
            className="py-2 flex items-center gap-3 text-black/90 px-4 text-[14px] border-b border-stroke cursor-pointer  hover:bg-slate-50 dark:hover:bg-primary/10"
          >
            Contact Support
          </li>
          <li
            onClick={() => {}}
            className="py-2 flex items-center gap-3 text-black/90 px-4 text-[14px] border-b border-stroke cursor-pointer  hover:bg-slate-50 dark:hover:bg-primary/10"
          >
             FAQ
          </li>
          <li
            onClick={() => {}}
            className="py-2 flex items-center gap-3 text-black/90 px-4 text-[14px] border-b border-stroke cursor-pointer  hover:bg-slate-50 dark:hover:bg-primary/10"
          >
           Tour Guide
          </li>

          <li
            onClick={() => {}}
            className="py-2 px-4 flex items-center gap-2 text-[14px] cursor-pointer border-b border-stroke text-black/90  hover:bg-slate-50 dark:hover:bg-primary/10 dark:text-slate-100"
          >
            Task
          </li>
        </ul>
      </div>
    </li>
  );
};

export default DropdownSupport;
