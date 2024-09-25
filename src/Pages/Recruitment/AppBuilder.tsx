import { useState } from "react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./style.css";
import { Icons } from "../../components/icons";
import { MatchChart } from "./MatchChart";
import { Textarea } from "../../components/textarea";
import BtnIcon from "../../assets/btnIcon.png";
import PDFViewerLayout from "./PDFViewerLayout";

const AppBuilder = () => {
  const [progress, setProgress] = useState(0);

  return (
    <PDFViewerLayout setProgress={setProgress}>
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
    </PDFViewerLayout>
  );
};

export default AppBuilder;
