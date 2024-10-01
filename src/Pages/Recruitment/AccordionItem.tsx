import { useState } from "react";
import { Icons } from "../../components/icons";

export const AccordionItem = ({ header, text, children }: any) => {
  const [active, setActive] = useState(false);

  const handleToggle = () => {
    event?.preventDefault();
    setActive(!active);
  };
  return (
    <div className="mb-8 mx-auto border-y border-[#D4D4D4] mt-5 w-[90%] px-2 py-2">
      <button
        className={`faq-btn flex w-full gap-4 items-center justify-between`}
        onClick={() => handleToggle()}
      >
        <div className="flex items-center gap-2 pb-1">
          <h4 className="text-sm w-full">{header}</h4>

          <label className="relative inline-flex cursor-pointer items-center">
            <input id="switch" type="checkbox" className="peer sr-only" />
            <label htmlFor="switch" className="hidden"></label>
            <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
          </label>
        </div>

        <div className="">
          <Icons.download />
        </div>
      </button>

      <div
        className={`duration-200 ease-in-out border-[#D4D4D4] border-t mt-2 ${
          active ? "block" : "hidden"
        } `}
      >
        <div className=""> {children}</div>
      </div>
    </div>
  );
};
