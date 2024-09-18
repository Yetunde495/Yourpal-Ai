import { IoCopyOutline } from "react-icons/io5";
import Modal from "../../components/modal";
import { FiDownload } from "react-icons/fi";
import MDEditor, {
  title,
  bold,
  italic,
  strikethrough,
  link,
} from "@uiw/react-md-editor";
import { useState } from "react";

const CoverLetterDetails: React.FC<{
  show: boolean;
  setShow: () => void;
  resumeData: any;
}> = ({ show, setShow, resumeData }) => {
  const [value, setValue] = useState<any>(resumeData?.cover_letter ?? "");

  return (
    <div>
      <Modal
        show={show}
        onHide={setShow}
        title="Cover Letter"
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

          <div className="wmde-markdown-var mt-6 mb-9">
            <MDEditor
              value={value}
              onChange={(val) => {
                setValue(val);
              }}
              preview="edit"
              textareaProps={{
                placeholder: "Enter your text",
              }}
              height={320}
              commands={[title, bold, italic, strikethrough, link]}
            />
          </div>

          <div className="flex justify-end items-center gap-3">
            <button
              className="px-4 flex items-center gap-2 py-2 font-medium text-black"
              onClick={setShow}
            >
              Close
            </button>
            <button className="px-6 py-2 bg-transparent rounded-full text-primary border border-primary hover:bg-primary hover:text-white">
              New Cover Letter
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

export default CoverLetterDetails;
