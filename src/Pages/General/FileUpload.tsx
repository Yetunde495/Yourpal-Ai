import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
import { BsFillTrash3Fill} from "react-icons/bs";
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
  acceptedFiles,
  supportedFormat
}: {
  onChange?: (files: File[]) => void;
  maxFiles?: number;
  acceptedFiles?: string[];
  supportedFormat?: string
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
    accept: acceptedFiles
    ? Object.fromEntries(acceptedFiles.map((type) => [type, []]))  // Create object from array
    : undefined,
  });

  return (
    <div className="w-full" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="px-10 py-6 group/file block rounded-lg cursor-pointer w-full relative overflow-hidden"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept={acceptedFiles ? acceptedFiles.join(',') : undefined}
          multiple
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />
        <div className="flex flex-col items-center justify-center relative">
          <p className="font-bold text-neutral-700 text-base">
            Upload files
          </p>
          <p className="font-normal text-neutral-600 mt-2">
            Drag and drop your files here or click to upload
          </p>
          <p className="text-neutral-500">{supportedFormat}</p>
          <div className="mt-6 max-w-xl w-full mx-auto">
            {/* File List */}
            {files.length > 0 &&
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-white dark:bg-neutral-900 flex flex-col items-start justify-start md:h-24 p-4 mt-4 w-full mx-auto rounded-md",
                    "shadow-xl"
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="text-base text-neutral-700 dark:text-neutral-300 truncate max-w-xs"
                    >
                      {file.name}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="rounded-lg px-2 py-1 w-fit flex-shrink-0 space-x-2 text-sm text-neutral-600 dark:bg-neutral-800 dark:text-white shadow-input"
                    >
                      <span>{(file.size / (1024 * 1024)).toFixed(2)} MB</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDelete(idx)
                        }}
                        className="text-danger hover:text-red-500"
                      >
                        <BsFillTrash3Fill className="w-4 h-4 -mb-[3px]" />
                      </button>
                    </motion.div>
                  </div>

                  <div className="flex text-sm md:flex-row flex-col items-start md:items-center w-full mt-2 justify-between text-neutral-600 dark:text-neutral-400">
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-1 py-0.5 rounded-md bg-gray-100 dark:bg-neutral-800 "
                    >
                      {file.type}
                    </motion.p>

                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                    >
                      modified{" "}
                      {new Date(file.lastModified).toLocaleDateString()}
                    </motion.p>
                  </div>
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
                  "relative group-hover/file:shadow-2xl z-40 bg-white dark:bg-neutral-900 flex items-center justify-center h-28 my-4 w-full max-w-[8rem] mx-auto rounded-md",
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
                className="absolute top-24 opacity-0 border border-dashed border-sky-400 inset-0 z-30 bg-transparent flex items-center justify-center h-32 mt-4 w-full max-w-[8rem] mx-auto rounded-md"
              ></motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
