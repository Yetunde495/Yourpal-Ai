import { Dispatch, SetStateAction, useRef } from "react";
import { motion } from "framer-motion";

type Position = {
    left: number;
    width: number;
    opacity: number;
  };

const SlideTab = ({
  children,
  setPosition,
  tab,
  activeTab,
  onChange,
  noBg,
}: {
  children: React.ReactNode;
  tab?: string;
  activeTab: string;
  onChange: (tab: string) => void;
  noBg: boolean;
  setPosition: Dispatch<SetStateAction<Position>>;
}) => {
  const ref = useRef<null | HTMLLIElement>(null);
  let val: any = tab || children

  let classNames = "relative z-10 block cursor-pointer hover:text-white py-2 px-3 text-sm font-medium md:text-base ";
  let clsN = val === activeTab && !noBg ? classNames+'rounded-md bg-jobseeker text-white' : classNames+' text-black';
  

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref?.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={() => onChange(val)}
      className={clsN}    
      >
      {children}
    </li>
  );
};

export const Cursor = ({ position }: { position: Position }) => {
  return (
    <motion.li
      animate={{
        ...position,
      }}
      className="absolute z-0 h-10 px-3 rounded-md bg-jobseeker text-white py-2"
    />
  );
};

export default SlideTab;

