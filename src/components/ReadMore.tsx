import React, { useState } from "react";

interface Props {
  text: string;
}

const ReadMoreComponent: React.FC<Props> = ({ text }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const wordsArray = text.split(" ");
  const slicedText = wordsArray.slice(0, 50).join(" ");

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="dark:bg-[#0d1117] mb-5 py-2">
      <p>{isExpanded ? text : slicedText}</p>
      {wordsArray.length > 50 && (
        <button
          className="text-slate-600 text-[15px] dark:text-slate-100 hover:underline focus:outline-none flex w-full justify-end"
          onClick={toggleExpanded}
        >
          {isExpanded ? "Hide" : "Read More"}
        </button>
      )}
    </div>
  );
};

export default ReadMoreComponent;
