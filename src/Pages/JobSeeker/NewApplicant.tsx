import { useState } from "react";
import SlideTab, { Cursor } from "../../AnimatedUi/SlideTabs";
import Modal, { FullModal } from "../../components/modal";
import { ScrollArea } from "../../components/scroll-area";
import { useApp } from "../../context/AppContext";
import { DropdownSelect } from "../../components/form/customDropdown";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { FileUpload } from "../General/FileUpload";
import { FaStarOfLife } from "react-icons/fa6";
import FieldInput from "../../components/form/Input";
import { TextArea } from "../../components/form";
import BtnIcon from "../../assets/btnIcon.png";
import { useNavigate } from "react-router-dom";
import ApplicationResult from "../PageComponents/ApplicationResult";

type Position = {
  left: number;
  width: number;
  opacity: number;
};

const NewApplicationKit: React.FC<{ show: boolean; onClose: () => void }> = ({
  show,
  onClose,
}) => {
  const navigate = useNavigate()
  const [tab, setTab] = useState("Resume");
  const [hover, setHover] = useState(false);
  const [position, setPosition] = useState<Position>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const { savedResumes } = useApp();
  const [selectedOption, setSelectedOption] = useState<string>("saved");
  const [applicantData, setApplicantData] = useState({
    linkedinUrl: "",
    company_name: "",
    job_description: "",
  });
  const [imported, setImported] = useState(false);
  const [importLoading, setImportingLoading] = useState(false);
  const [isResultready, setIsResultready] = useState(false);
  const [formView, setFormView] = useState(show)

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };
  return (
    <div>
      <Modal show={formView} onHide={() => {
        setFormView(false)
        onClose()
      }}>
        <div className="mb-10 text-center flex flex-col w-full justify-center items-center">
          <h2 className="text-black text-2xl mb-2.5 font-outfit font-semibold">
            Create New
          </h2>
          <div className="">
            <ul
              onMouseLeave={() => {
                setPosition((pv) => ({
                  ...pv,
                  opacity: 0,
                }));
                setHover(false);
              }}
              onMouseEnter={() => {
                setHover(true);
              }}
              className="relative grid grid-cols-2 md:w-[400px] w-[300px] rounded-md border border-stroke"
            >
              <SlideTab
                activeTab={tab}
                tab="Resume"
                onChange={setTab}
                setPosition={setPosition}
                noBg={hover}
              >
                <span className="uppercase font-medium">Resume</span>
              </SlideTab>
              <SlideTab
                activeTab={tab}
                tab="Application Kit"
                onChange={setTab}
                setPosition={setPosition}
                noBg={hover}
              >
                <span className="uppercase font-medium">Application Kit</span>
              </SlideTab>

              <Cursor position={position} />
            </ul>
          </div>
        </div>

        {tab === "Application Kit" ? (
          <div>
            <ScrollArea className="h-[50vh]">
              <div>
                <label className="font-medium mb-3 block">
                  Choose how to provide your resume:
                </label>
                <div className="flex items-center flex-wrap gap-4">
                  <label className="flex items-center  space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="saved"
                      checked={selectedOption === "saved"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">
                      Select from saved resumes
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="upload"
                      checked={selectedOption === "upload"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">Upload resume</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="linkedin"
                      checked={selectedOption === "linkedin"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">Import from LinkedIn</span>
                  </label>
                </div>
              </div>

              <div className="bg-[#E4E4E4] rounded-xl px-4 mt-10 py-5">
                {selectedOption === "saved" && (
                  <div className="bg-white rounded-lg">
                    <DropdownSelect
                      label=""
                      placeholder="Select Resume..."
                      options={savedResumes.map((val: any) => ({
                        label: val.name,
                        value: val.id,
                      }))}
                      onSelect={(val) => {
                        console.log(val);
                      }}
                    />
                  </div>
                )}

                {selectedOption === "linkedin" && (
                  <div className="rounded-lg">
                    <div className="relative">
                      <input
                        className={`w-full rounded-lg border border-stroke py-3 pl-4.5 pr-24
                    text-black focus:border-primary focus-visible:outline-none dark:border-strokedark 
                    dark:bg-meta-4 dark:text-white dark:focus:border-primary `}
                        value={applicantData?.linkedinUrl}
                        onChange={(e) =>
                          setApplicantData((s: any) => ({
                            ...s,
                            linkedinUrl: e.target.value,
                          }))
                        }
                        placeholder="Enter Linkedin URL and click submit button"
                      />
                      <span className="absolute right-0 top-[1px]">
                        <button
                          disabled={importLoading}
                          onClick={() => {
                            if (imported) {
                              setApplicantData((s: any) => ({
                                ...s,
                                linkedinUrl: "",
                              }));
                              setImported(false);
                            } else {
                              setImportingLoading(true);
                            }
                          }}
                          className="bg-primary hover:bg-secondary text-white disabled:bg-primary/60 px-4 py-3 rounded-r-lg"
                        >
                          {imported ? "Reset" : "Submit"}
                        </button>
                      </span>
                    </div>

                    <div className="mt-3">
                      {importLoading && (
                        <p
                          className="flex gap-2 items-center font-medium"
                          onClick={() => {
                            setImportingLoading(false);
                            setImported(true);
                          }}
                        >
                          {" "}
                          <span className="animate-pulse">
                            <BsCircle size={18} />
                          </span>
                          Scanning Linkedin Profile
                        </p>
                      )}
                      {imported && (
                        <p className="flex gap-2 items-center text-[15px]">
                          {" "}
                          <span className="text-success">
                            <BsCheckCircleFill />
                          </span>{" "}
                          Imported from LinkedIn
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {selectedOption === "upload" && (
                  <div className="bg-slate-50 rounded-lg">
                    <FileUpload
                      maxFiles={1}
                      onChange={(files: any) => console.log(files)}
                      acceptedFiles={[
                        "application/pdf",
                        "application/msword",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                      ]}
                      supportedFormat="Supported File Format: PDF, DOC and DOCX"
                    />
                  </div>
                )}
              </div>

              <div className="bg-[#E4E4E4] rounded-lg px-4 mt-10 py-5 space-y-4">
                <div className="flex justify-start">
                  <p className="mb-1 font-medium flex items-center gap-1">
                    Job Description you’d like to Match the resume to{" "}
                    <span>
                      <FaStarOfLife className="text-danger" size={8} />
                    </span>
                  </p>
                </div>
                <FieldInput
                  label=""
                  placeholder="Company name"
                  name=""
                  id=""
                  value=""
                  onChange={(val) => {
                    setApplicantData((s: any) => ({
                      ...s,
                      company_name: val,
                    }));
                  }}
                />
                <TextArea
                  placeholder="Paste job description/title here..."
                  label=""
                  value=""
                  onChange={(val) => {
                    setApplicantData((s: any) => ({
                      ...s,
                      job_description: val,
                    }));
                  }}
                  props={{ roundedLg: true }}
                  name="description"
                  row={5}
                />
              </div>
            </ScrollArea>
            <div className="mt-10 flex items-center justify-between">
              <button
                className="font-medium text-lg"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </button>
              <button onClick={() => {
                setFormView(false)
                setIsResultready(true)
              }} className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-8 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                  <img src={BtnIcon} /> Generate
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ScrollArea
              className={`${
                selectedOption === "new" ? "h-[30vh]" : "h-[50vh]"
              }`}
            >
              <div>
                <label className="font-medium mb-3 block">
                  Choose how to provide your resume:
                </label>
                <div className="flex items-center flex-wrap gap-4">
                  <label className="flex items-center  space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="saved"
                      checked={selectedOption === "saved"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">
                      Select from saved resumes
                    </span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="upload"
                      checked={selectedOption === "upload"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">Upload resume</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="linkedin"
                      checked={selectedOption === "linkedin"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">Import from LinkedIn</span>
                  </label>

                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="resumeOption"
                      value="new"
                      checked={selectedOption === "new"}
                      onChange={handleOptionChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="text-gray-800">Start from Scratch</span>
                  </label>
                </div>
              </div>

              {selectedOption !== "new" && (
                <div className="bg-[#E4E4E4] rounded-xl px-4 mt-10 py-5">
                  {selectedOption === "saved" && (
                    <div className="bg-white rounded-lg">
                      <DropdownSelect
                        label=""
                        placeholder="Select Resume..."
                        options={savedResumes.map((val: any) => ({
                          label: val.name,
                          value: val.id,
                        }))}
                        onSelect={(val) => {
                          console.log(val);
                        }}
                      />
                    </div>
                  )}

                  {selectedOption === "linkedin" && (
                    <div className="rounded-lg">
                      <div className="relative">
                        <input
                          className={`w-full rounded-lg border border-stroke py-3 pl-4.5 pr-24
                text-black focus:border-primary focus-visible:outline-none dark:border-strokedark 
                dark:bg-meta-4 dark:text-white dark:focus:border-primary `}
                          value={applicantData?.linkedinUrl}
                          onChange={(e) =>
                            setApplicantData((s: any) => ({
                              ...s,
                              linkedinUrl: e.target.value,
                            }))
                          }
                          placeholder="Enter Linkedin URL and click submit button"
                        />
                        <span className="absolute right-0 top-[1px]">
                          <button
                            disabled={importLoading}
                            onClick={() => {
                              if (imported) {
                                setApplicantData((s: any) => ({
                                  ...s,
                                  linkedinUrl: "",
                                }));
                                setImported(false);
                              } else {
                                setImportingLoading(true);
                              }
                            }}
                            className="bg-primary hover:bg-secondary text-white disabled:bg-primary/60 px-4 py-3 rounded-r-lg"
                          >
                            {imported ? "Reset" : "Submit"}
                          </button>
                        </span>
                      </div>

                      <div className="mt-3">
                        {importLoading && (
                          <p
                            className="flex gap-2 items-center font-medium"
                            onClick={() => {
                              setImportingLoading(false);
                              setImported(true);
                            }}
                          >
                            {" "}
                            <span className="animate-pulse">
                              <BsCircle size={18} />
                            </span>
                            Scanning Linkedin Profile
                          </p>
                        )}
                        {imported && (
                          <p className="flex gap-2 items-center text-[15px]">
                            {" "}
                            <span className="text-success">
                              <BsCheckCircleFill />
                            </span>{" "}
                            Imported from LinkedIn
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedOption === "upload" && (
                    <div className="bg-slate-50 rounded-lg">
                      <FileUpload
                        maxFiles={1}
                        onChange={(files: any) => console.log(files)}
                        acceptedFiles={[
                          "application/pdf",
                          "application/msword",
                          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                        ]}
                        supportedFormat="Supported File Format: PDF, DOC and DOCX"
                      />
                    </div>
                  )}
                </div>
              )}

              {selectedOption !== "new" && (
                <div className="bg-[#E4E4E4] rounded-lg px-4 mt-10 py-5 space-y-4">
                  <div className="flex justify-start">
                    <p className="mb-1 font-medium flex items-center gap-1">
                      Job Description you’d like to tailor the resume to{" "}
                    </p>
                  </div>
                  <FieldInput
                    label=""
                    placeholder="Company name"
                    name=""
                    id=""
                    value={applicantData?.company_name}
                    onChange={(val) => {
                      setApplicantData((s: any) => ({
                        ...s,
                        company_name: val,
                      }));
                    }}
                  />
                  <TextArea
                    placeholder="Paste job description/title here..."
                    label=""
                    value={applicantData?.job_description}
                    onChange={(val) => {
                      setApplicantData((s: any) => ({
                        ...s,
                        job_description: val,
                      }));
                    }}
                    props={{ roundedLg: true }}
                    name="description"
                    row={5}
                  />
                </div>
              )}

              {selectedOption === "new" && (
                <p className="text-center mt-15">
                  Click the <span className="font-semibold">Continue</span>{" "}
                  button to create a Resume from scratch
                </p>
              )}
            </ScrollArea>

            <div className="mt-10 flex items-center justify-between">
              <button
                className="font-medium text-lg"
                onClick={() => {
                  onClose();
                }}
              >
                Close
              </button>
              {(!applicantData?.company_name ||
              !applicantData?.job_description) ? (
                <button onClick={() => navigate(`/app/resume-builder`)} className="border border-jobseeker text-jobseeker hover:bg-jobseeker hover:text-white rounded-full py-2 font-medium px-6 ">
                  Continue
                </button>
              ) : (
                <button onClick={() => setIsResultready(true)} className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-8 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                    <img src={BtnIcon} /> Generate
                  </span>
                </button>
              )}
            </div>
          </div>
        )}
      </Modal>
      <FullModal show={isResultready} onHide={onClose}>
        <ApplicationResult />
      </FullModal>
    </div>
  );
};

export default NewApplicationKit;
