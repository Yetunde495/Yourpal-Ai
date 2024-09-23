import { IoCopyOutline } from "react-icons/io5";
import Modal from "../../components/modal";
import { FiDownload } from "react-icons/fi";
import { useState } from "react";

const InterviewTips: React.FC<{
  show: boolean;
  setShow: () => void;
  resumeData: any;
}> = ({ show, setShow, resumeData }) => {

  return (
    <div>
      <Modal
        show={show}
        onHide={setShow}
        title="Interview Tips"
        onProceed={() => {}}
        size="w-full max-w-[80%]"
      >
        <div className="px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center rounded-lg">
              <button className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] hover:bg-zinc-200 rounded-l-lg">
                <FiDownload /> Download PDF
              </button>
              <button className="px-4 flex items-center gap-2 py-2 bg-[#E0E0E080] rounded-r-lg hover:bg-zinc-200">
                <IoCopyOutline /> Copy
              </button>
            </div>
            <div>
              <button>Regenerate</button>
            </div>
          </div>

          <div className="h-[320px] border border-stroke rounded-md overflow-y-auto custom-scrollbar mt-6 mb-9">
            
          </div>

          <div className="flex justify-end items-center gap-3">
            <button
              className="px-4 flex items-center gap-2 py-2 font-medium text-black"
              onClick={setShow}
            >
              Close
            </button>
            <div>
              <button className="px-6 py-2 bg-primary rounded-full text-white hover:bg-primary/95">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InterviewTips;