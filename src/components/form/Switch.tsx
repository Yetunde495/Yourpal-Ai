import React from 'react';
import { BiSolidCircle } from 'react-icons/bi';

interface SwitchProps {
    value: boolean;          // The current value of the switch
    onChange?: (value: boolean) => void; // Callback function to handle switch changes
    checked: boolean;        // Whether the switch is checked or not
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>; // Additional input element props
    className?: string;      // Additional CSS class name for styling
    label?: string; 
    name?:string;         // Optional label for the switch
  }

export const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  checked,
  inputProps,
  className,
  label,
}) => {
  const handleSwitchChange = () => {
    onChange && onChange(!value);
  };

  const switchClasses = `relative inline-block w-12 h-5.5 transition-all duration-300 ease-in-out rounded-full ${
    checked ? 'bg-primary' : 'bg-slate-200'
  }`;
  
  // const sliderClasses = `absolute left-0 inline-block w-4 h-2 transform translate-x-0.5 translate-y-0.5 transition-transform duration-300 ease-in-out rounded-full bg-white`;


  return (
    <div className={`flex items-center cursor-pointer ${className || ''}`}>
    {label && <label className="mr-2">{label}</label>}
    <label className={switchClasses}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleSwitchChange}
        className="absolute top-0 z-50 m-0 h-full w-full cursor-pointer opacity-0"
        {...inputProps}
      />
      <span className={`absolute top-1/2 left-[3px] flex h-5 w-5.5 -translate-y-1/2 translate-x-0 items-center justify-center rounded-full bg-white shadow-switcher duration-75 ease-linear ${
            value && '!right-[4px] !translate-x-full'
          }`}>
      <span className={`${value ? 'hidden' : ''}`}>
           <BiSolidCircle className=" text-white"/>
          </span>

          <span className={`${value ? 'inline-block' : 'hidden'}`}>
           <BiSolidCircle className=" text-white"/>
          </span>
          
      </span>
     
    </label>
  </div>
  );
};
