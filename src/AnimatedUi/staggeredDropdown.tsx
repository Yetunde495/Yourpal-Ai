import { motion } from "framer-motion";
import React, { useState } from "react";
import { IconType } from "react-icons";
import { BsThreeDots } from "react-icons/bs";

const StaggeredDropDown: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      <motion.div animate={open ? "open" : "closed"} className="relative">
        <button
          onClick={() => setOpen((pv) => !pv)}
          className="flex items-center gap-2 px-3 py-2 rounded-md"
        >
          <motion.span variants={iconVariants}>
            <BsThreeDots />
          </motion.span>
        </button>

        <motion.ul
          initial={wrapperVariants.closed}
          variants={wrapperVariants}
          style={{ originY: "top", translateX: "-50%" }}
          onClick={() => setOpen(false)}
          className="flex flex-col z-999 gap-2 p-2 rounded-lg bg-white/90 shadow-3 absolute top-[120%] left-4 min-w-40 w-full overflow-hidden"
        >
          {children}
          {/* <Option setOpen={setOpen} Icon={FiEdit} text="Edit" /> */}
        </motion.ul>
      </motion.div>
    </div>
  );
};

export const AnimatedOption = ({
  text,
  Icon,
  onClick,
}: {
  text: string;
  Icon?: IconType;
  onClick: () => void;
}) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={onClick}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-slate-700 hover:text-indigo-500 transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        {Icon && <Icon />}
      </motion.span>
      <span>{text}</span>
    </motion.li>
  );
};

export default StaggeredDropDown;

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const iconVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
