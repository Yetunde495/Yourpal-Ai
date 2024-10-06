import React, { useEffect, useRef, useState } from "react";

interface DropdownProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  bg?: boolean;
}
const Dropdown: React.FC<DropdownProps> = ({
  children,
  icon,
  disabled,
  bg = true,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
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

  useEffect(() => {
    if (dropdown.current) {
      const dropdownItems = dropdown.current.querySelectorAll(".dropdownItems");

      const closeDropdown = () => {
        if (dropdownOpen) {
          setDropdownOpen(false);
        }
      };

      dropdownItems.forEach((item) => {
        item.addEventListener("click", closeDropdown);
      });

      return () => {
        dropdownItems.forEach((item) => {
          item.removeEventListener("click", closeDropdown);
        });
      };
    }
  }, []);

  return (
    <div className="w-full">
      <button
        ref={trigger}
        onClick={(e: any) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
        disabled={disabled}
        className=" dark:text-white w-full dark:border px-2.5 py-2 rounded"
      >
        {icon}
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`absolute mt-2.5 z-[9999] flex h-auto  min-w-[240px] right-3.5 flex-col rounded-lg border border-stroke ${
          bg === true
            ? "bg-[#F5FAFF] dark:bg-[#24303F]"
            : "bg-[#ffffff] dark:bg-[#24303F]"
        } shadow-default dark:border-strokedark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export const SideDropdown: React.FC<DropdownProps> = ({
  children,
  icon,
  disabled,
  bg = true,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<HTMLButtonElement | null>(null);
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

  useEffect(() => {
    if (dropdown.current) {
      const dropdownItems = dropdown.current.querySelectorAll(".dropdownItems");

      const closeDropdown = () => {
        if (dropdownOpen) {
          setDropdownOpen(false);
        }
      };

      dropdownItems.forEach((item) => {
        item.addEventListener("click", closeDropdown);
      });

      return () => {
        dropdownItems.forEach((item) => {
          item.removeEventListener("click", closeDropdown);
        });
      };
    }
  }, []);

  return (
    <div className="w-full">
      <button
        ref={trigger}
        onClick={(e: any) => {
          e.stopPropagation();
          setDropdownOpen(!dropdownOpen);
        }}
        disabled={disabled}
        className=" dark:text-white w-full dark:border px-2.5 py-2 rounded"
      >
        {icon}
      </button>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`absolute mt-2.5 z-[9999] bg-white flex h-auto  min-w-[240px] left-full flex-col rounded-lg border border-stroke 
       shadow-default dark:border-strokedark ${
          dropdownOpen === true ? "block" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
