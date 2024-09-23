// src/components/Accordion.tsx
import React, { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

interface AccordionProps {
  items: {
    title: string | React.ReactNode;
    content: React.ReactNode;
    showIcon?: boolean;
    icon?: React.ReactNode;
    accordionHeaderBg?: string;
  }[];
  initialOpenIndex?: number | null;
}

const Accordion: React.FC<AccordionProps> = ({ items, initialOpenIndex }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(
    initialOpenIndex !== undefined ? Number(initialOpenIndex) : null
  );

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div className="w-full bg-white dark:bg-boxdark-2">
      {items.map((item, index) => {
        return (
          <div key={index} className="mb-4 bg-white dark:bg-boxdark-2">
            <button
              onClick={() => toggleItem(index)}
              className="w-full py-2 text-left bg-neutral-100 flex justify-between items-center"
            >
              <div className="flex ml-4 gap-2 items-center">
                {item.showIcon && (
                  <div className="text-zinc-500">{item.icon}</div>
                )}
                <span style={{ color: item.accordionHeaderBg }}>
                  {item.title}
                </span>
              </div>
              <div>
                {openIndex === index ? (
                  <IoIosArrowUp className="dark:text-primary mr-4" size={22} />
                ) : (
                  <IoIosArrowDown
                    className="dark:text-primary mr-4"
                    size={22}
                  />
                )}
              </div>
            </button>
            {openIndex === index && (
              <div className="py-3 px-4 text-sm bg-neutral-100 dark:bg-boxdark-2 dark:text-slate-50 mb-5 rounded-b-md">
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
