/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { BsPersonAdd, BsFiletypeXlsx } from "react-icons/bs";
import { FiDownloadCloud } from "react-icons/fi";
import { FaFilter } from "react-icons/fa6";
import {
  AiOutlinePlus,
  AiFillDelete,
  AiOutlineFolderView,
} from "react-icons/ai";
import { BiPrinter, BiEdit } from "react-icons/bi";
import BtnIcon from "../../assets/svg/btn-icon-2.svg";


interface ButtonProps {
  children?: React.ReactNode;
  text?: string;
  disabled?: boolean;
  size?: "xsm" | "sm" | "md" | "lg";
  type?: "submit" | "button" | "reset";
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "light"
    | "link"
    | "transparent" | "outline-primary" | "jobseeker" | "recruiter" | "socialpal";
  classNames?: string;
  btnProps?: any;
  elevation?: number;
  width?: string;
  height?: string;
  rounded?: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

interface ButtonEventProps {
  children?: React.ReactNode;
  disabled?: boolean;
  variant?:
    | "user"
    | "filter"
    | "add"
    | "download"
    | "sheet"
    | "print"
    | "delete"
    | "view"
    | "edit";
  onClick: () => void;
  hide?: boolean;
  bordered?: boolean;
}

export const ButtonEventGroup: React.FC<{
  children: React.ReactNode;
  dir?: "left" | "right";
}> = ({ children, dir }) => (
  <div
    className={`flex flex-row flex-wrap gap-1 items-center ${
      dir === "left" ? "justify-start" : "justify-end"
    }`}
  >
    {children}
  </div>
);

export const ButtonEvent: React.FC<ButtonEventProps> = ({
  variant,
  children,
  disabled,
  onClick,
  hide,
  bordered,
}) => {
  const icon =
    variant === "user" ? (
      <BsPersonAdd />
    ) : variant === "filter" ? (
      <FaFilter />
    ) : variant === "download" ? (
      <FiDownloadCloud />
    ) : variant === "sheet" ? (
      <BsFiletypeXlsx />
    ) : variant === "print" ? (
      <BiPrinter />
    ) : variant === "delete" ? (
      <AiFillDelete />
    ) : variant === "view" ? (
      <AiOutlineFolderView />
    ) : variant === "edit" ? (
      <BiEdit />
    ) : (
      <AiOutlinePlus />
    );
  let cls = `flex flex-row items-center justify-end py-1 px-4 ml-2 cursor-pointer font-medium text-black dark:text-white`;
  cls += bordered ? " border" : "";
  return !hide ? (
    <div
      aria-disabled={disabled}
      onClick={() => (!disabled ? onClick() : () => {})}
      className={cls}
    >
      {icon} &nbsp;&nbsp;{children}
    </div>
  ) : null;
};

export default function Button({
  children,
  text,
  disabled,
  onClick,
  type = "button",
  variant = "primary",
  btnProps,
  elevation,
  width,
  height,
  rounded,
  size,
}: ButtonProps) {
  const bgColor =
    variant === "primary"
      ? "bg-primary hover:bg-secondary  text-white"
      : variant === "jobseeker" 
      ? "bg-jobseeker hover:opacity-95 text-white"
      : variant === "secondary"
      ? "bg-[#00112c] text-white"
      : variant === "danger"
      ? "bg-meta-1 text-white"
      : variant === "link"
      ? "bg-transparent text-primary hover:text-primary-2 underline underline-offset-[3px] rounded-none py-0"
      : variant === "transparent"
      ? "bg-transparent text-black hover:bg-slate-200 border border-slate-300"
      : variant === "outline-primary" 
      ? "bg-white border border-primary text-primary hover:bg-secondary hover:text-white"
      : "bg-gray text-black";
  let btnCls = `flex justify-center transition disabled:opacity-65 ${bgColor} ${
    rounded ? "rounded-full" : "rounded-md"
  } ${size === "lg" ? "py-2 px-10" : "py-2 px-6"}  font-medium `;
  // btnCls = size === 'xsm' ? btnCls +' w-10' : size === 'sm' ? btnCls +' w-32' : size === 'md' ? btnCls + ' w-64' : size === 'lg' ? btnCls + ' w-128': btnCls + ' w-100';
  btnCls = elevation ? btnCls + " hover:shadow-" + elevation : btnCls;
  btnCls = width ? btnCls + " w-" + width : btnCls;
  btnCls = height ? btnCls + " h-" + height : btnCls;

  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      onClick={onClick}
      className={btnCls}
      type={type}
      {...btnProps}
    >
      <span className="hover:scale-105 w-full flex justify-center items-center gap-2">
      {text || children}
      </span>
    </button>
  );
}

export const GradientButton: React.FC<{disabled?:boolean, onClick:() => void, text:string, className?: string, props?: any}> = ({disabled, onClick, text, className, props}) => {
  return (
    <div className={`${className && className} button-wrapper`}>
    <div className="button-bg group w-full text-center">
      <button
        className="rounded-full bg-white group-hover:bg-transparent group:hover:text-white w-full"
        onClick={onClick}
        disabled={disabled}
        type="button"
      >
        <span className={`text-gradient gap-2 font-medium text-center justify-center items-center w-full ${props?.padding ? props?.padding : 'py-1 px-3'} text-sm`}> <img src={BtnIcon} alt="icon" /> {text}</span>
      </button>
    </div>
  </div>
  )
}
