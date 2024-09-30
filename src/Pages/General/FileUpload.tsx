import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { BsTrashFill } from "react-icons/bs";
import { MdOutlineFileUpload } from "react-icons/md";
import { cn } from "../../lib/utils";


const mainVariant = {
    initial: {
      x: 0,
      y: 0,
    },
    animate: {
      x: 20,
      y: -20,
      opacity: 0.9,
    },
  };
  const secondaryVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
export const FileUpload = ({
  onChange,
  maxFiles = 5,
}: {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handles adding files, respecting the maxFiles limit
  const handleFileChange = (newFiles: File[]) => {
    if (files.length + newFiles.length > maxFiles) {
      return; // Prevent adding more files than the allowed maxFiles
    }

    const updatedFiles = [...files, ...newFiles];
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles); // Return the updated files list
  };

  // Handles file deletion
  const handleDelete = (index: number) => {
    const updatedFiles = files.filter((_, idx) => idx !== index);
    setFiles(updatedFiles);
    onChange && onChange(updatedFiles); // Return the updated files list
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: true,
    noClick: true,
    onDrop: handleFileChange,
    onDropRejected: (error) => {
      console.log(error);
    },
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center">
          <p className="font-sans font-bold text-neutral-700 text-base">
            Upload files
          </p>
          <p className="font-sans font-normal text-neutral-400 text-base mt-2">
            Drag or drop your files here or click to upload
          </p>
          <div className="mt-10 max-w-xl w-full mx-auto">
            {/* File List */}
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={file.name + idx}
                  className="relative bg-white dark:bg-neutral-900 flex items-center justify-between p-4 mt-4 w-full rounded-md shadow-sm"
                >
                  <div className="flex flex-col space-y-2">
                    <p className="text-base text-neutral-700 truncate max-w-xs">
                      {file.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(idx)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <BsTrashFill className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            {/* Placeholder Upload Area */}
            {files.length < maxFiles && (
             <motion.div
             layoutId="file-upload"
             variants={mainVariant}
             transition={{
               type: "spring",
               stiffness: 300,
               damping: 20,
             }}
             className={cn(
               "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md",
               "shadow-[0px_10px_50px_rgba(0,0,0,0.1)]"
             )}
           >
             {isDragActive ? (
               <motion.p
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-neutral-600 flex flex-col items-center"
               >
                 Drop it
                 <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-400" />
               </motion.p>
             ) : (
               <MdOutlineFileUpload className="h-4 w-4 text-neutral-600 dark:text-neutral-300" />
             )}
           </motion.div>
         )}

         {!files.length && (
           <motion.div
             variants={secondaryVariant}
             className="absolute opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
           ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
