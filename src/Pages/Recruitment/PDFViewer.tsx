import { ReactNode, useCallback, useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { useLocation } from "react-router-dom";
import DefaultLayout from "../../layout/DefaultLayout";
import "./style.css";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { Icons } from "../../components/icons";
import { cn } from "../../lib/utils/cn";
import PdfDropdown from "./PdfDropDown";
import { MatchChart } from "./MatchChart";
import { Textarea } from "../../components/textarea";
import BtnIcon from "../../assets/btnIcon.png";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

export interface PDFViewerProps {
  url: string;
  page: number;
  children?: ReactNode;
}

const dropdownItems = [
  { label: "Dashboard", href: "/#" },
  { label: "Preview", href: "/#" },
  { label: "Button", href: "/#" },
  { label: "Subscribe", href: "/#" },
];

const PDFViewer = () => {
  const location = useLocation();
  const { documentUrl, docTitle } = location.state || {};
  const [containerWidth, setContainerWidth] = useState<number>();
  const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDocument, setCurrentDocument] = useState(documentUrl);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress < 85) {
          return prevProgress + 10; // Increment by 10
        } else {
          clearInterval(interval); // Stop the interval when reaching or exceeding the target
          return 85; // Ensure progress is capped at target
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setCurrentDocument(fileUrl);
    }
  };

  const resizeObserverOptions = {};

  const maxWidth = 800;

  const onResize = useCallback<ResizeObserverCallback>((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setCurrentPage(1); // Reset to first page on load
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <DefaultLayout>
      <div className="pb-6">
        <div className="Example__container ">
          <div className="shadow-2 py-3 px-10 flex gap-5 justify-between items-center">
            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-2">
                <Icons.layout />
                <PdfDropdown buttonText="Template" items={dropdownItems} />
              </div>
              <div className="flex items-center gap-1">
                <Icons.colorLens />
                <PdfDropdown buttonText="Colors" items={dropdownItems} />
              </div>
              <div className="flex items-center gap-1">
                <Icons.fontUnderline />
                <PdfDropdown buttonText="Typography" items={dropdownItems} />
              </div>
              <div className="flex items-center gap-1">
                <Icons.slider />
                <PdfDropdown buttonText="Page Setup" items={dropdownItems} />
              </div>
            </div>

            <div className="flex gap-5 items-center">
              <div className="flex items-center gap-1">
                <Icons.world />
                EN
              </div>
              <div>
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex items-center gap-1"
                >
                  <Icons.import />
                  Import
                </label>
                <input
                  id="file-upload"
                  type="file"
                  // accept="application/pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
              <div className="flex items-center gap-1">
                <Icons.share />
                Share
              </div>

              <button className="border border-[#8343CC] flex items-center gap-1 text-[#8343CC] rounded-full text-sm px-3 py-1">
                <Icons.share />
                Download
              </button>
            </div>
          </div>

          <div className="flex justify-between">
            <div className="Example__container__document" ref={setContainerRef}>
              <div className="flex items-center justify-between mt-5">
                <div>
                  <h3>
                    Senior HR Expert{" "}
                    <span className="text-[#5B5B5BB2]">(Saved)</span>
                  </h3>
                </div>
                <div className="flex gap-3 text-xs items-center">
                  <div className="flex items-center gap-2">
                    <span className="text-base"> Resume</span>{" "}
                    <span className="bg-white rounded-full  px-2 py-0.5">
                      {currentPage}
                    </span>{" "}
                    of{" "}
                    <span className="bg-white rounded-full  px-2 py-0.5">
                      {numPages}
                    </span>
                  </div>
                  <div className="flex gap-2 items-center">
                    <button
                      onClick={goToPreviousPage}
                      disabled={currentPage === 1}
                      className={cn(
                        "border-[#D4D4D4] border-2 rounded-md hover:bg-[#D4D4D4] w-[28px] h-[24px] flex justify-center items-center"
                      )}
                    >
                      <Icons.previous />
                    </button>
                    <button
                      onClick={goToNextPage}
                      disabled={currentPage === numPages}
                      className="border-[#D4D4D4] border-2 rounded-md hover:bg-[#D4D4D4] w-[28px] h-[24px] flex justify-center items-center"
                    >
                      <Icons.next />
                    </button>
                  </div>
                </div>
                <div className="flex gap-2 items-center">
                  <Icons.trash className="text-red-500" />
                  <Icons.passwordEye />
                  <p>Preview</p>
                </div>
              </div>

              <Document
                file={currentDocument}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
                onLoadError={(error) =>
                  console.error("Failed to load PDF:", error)
                }
              >
                <Page
                  pageNumber={currentPage}
                  width={
                    containerRef
                      ? Math.min(containerRef.clientWidth, maxWidth)
                      : maxWidth
                  }
                />
              </Document>
            </div>

            {/* match Score */}
            <div className="mt-10 border border-[#D4D4D4] py-5 rounded-xl w-[25%]">
              <div className="divide-y divide-solid divide-[#D4D4D4]">
                <div className="flex items-center gap-2 px-4 pb-1">
                  <h4>Tailor Applicant</h4>
                  <Icons.InfoCircle />
                </div>
                <div className="flex- flex-col items-center justify-center text-center">
                  <h4 className="mt-5">Match Score</h4>
                  <MatchChart progress={progress} size={120} strokeWidth={13} />
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 justify-end mt-3">
                <h4 className="text-sm text-[#5B5B5B]">Tailor Applicant</h4>
                <Icons.InfoCircle />
              </div>

              <div className="px-4 mt-10 py-5">
                <div className="flex justify-start">
                  <p className=" mb-5">
                    Job Description<span className="text-red-500">*</span>
                  </p>
                </div>
                <Textarea
                  placeholder="Senior HR Expert"
                  className="md:h-40 border-[#D4D4D4] border-[0.08rem] w-full h-20 mb-5"
                />
              </div>

              <div className="flex flex-col items-center justify-center text-center">
                <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-5 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                    <img src={BtnIcon} /> Tailor to Job Description
                  </span>
                </button>
                <p className="mt-2 text-sm px-5">
                  donec. Adipiscing aenean velit quis eget tinvb massa enim eget{" "}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PDFViewer;
