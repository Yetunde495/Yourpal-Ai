// src/components/ProgressBar.tsx
import React from "react";

interface ProgressBarProps {
  percent: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percent }) => {
  return (
    <div className="relative w-full">
     
      <div className="relative w-full bg-black/10 h-2 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-primary"
          style={{ width: `${percent}%` }}
        ></div>
        <div
          className="h-full bg-gray-300"
          style={{ width: `${100 - percent}%` }}
        ></div>
      </div>
    </div>
  );
};



export default ProgressBar;
