import React from "react";
import { useController } from "react-hook-form";

type TextareaProps = {
  label: string;
  name: string;
  rules?: any;
  classNames?: string;
  defaultValue?:string;
  placeholder?: string;
  row?:number;
  cols?:number;
  formatValue?: (value: string) => string;
  OnChange?: (value: string) => void;
};

const Textarea: React.FC<TextareaProps> = ({ label, name, rules, OnChange, classNames, defaultValue, placeholder, }) => {
  const { field, fieldState } = useController({ name, rules, defaultValue });
  const { onChange, onBlur, value, ref } = field;
  const { error } = fieldState;

  const containerClass = classNames ? 'w-full ' + classNames : 'w-full';
  const errorData = error ? ' border-danger' : '' 

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    onChange(newValue);
    typeof OnChange === 'function' ? OnChange(newValue) : {}
  };

 
  return (
    <div className={containerClass}>
      <label
        htmlFor={name}
        className="mb-3 block text-black dark:text-white"
      >
        {label}
      </label>
      <textarea
        {...field}
        defaultValue={defaultValue}
        onBlur={onBlur}
        onChange={handleChange}
        value={value || ""}
        ref={ref}
        rows={4}
        placeholder={placeholder}
        className={`w-full rounded border border-stroke custom-scrollbar
         py-3 pl-4.5 pr-4.5 text-black
        focus:border-primary focus-visible:outline-none
        dark:border-strokedark dark:bg-meta-4
        dark:text-white dark:focus:border-primary${errorData}`}
      />
       {error && <small className='text-danger'>{error.message}</small>}
    </div>
  );
};

export default Textarea;