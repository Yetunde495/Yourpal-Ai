import React, { useState } from "react";
import { Sketch } from "@uiw/react-color"; // Import from the @uiw/react-color package
import { MdOutlineColorLens } from "react-icons/md";
import { Menu, MenuItem } from "../../AnimatedUi/AnimatedNav";
import { HiOutlineTemplate } from "react-icons/hi";
import { Icons } from "../../components/icons";
import { DropdownSelect } from "../../components/form/customDropdown";
import { IoMdColorFilter } from "react-icons/io";
import { FaCheck, FaPlus } from "react-icons/fa6";
import { Switch } from "../../components/form/Switch";
import { Select4 } from "../../components/form/Select";
import { PiSlidersHorizontalBold } from "react-icons/pi";
import { RiLayoutTopLine } from "react-icons/ri";
import { TfiLayout } from "react-icons/tfi";
import { AiOutlineLayout } from "react-icons/ai";
import {
  BasicInfo,
  Education,
  Experience,
  ProfessionalSummary,
  Skills,
} from "../ApplicantComponents";
import { UploadResumePhoto } from "../Authentication/uploadProfilephoto";

interface Experience {
  id: number;
  title: string;
  company: string;
  position: string;
  description: string;
  duration: string;
}

const fonts = [
  {
    label: "Nunito",
    value: "nunito",
  },
  {
    label: "Josefin Sans",
    value: "josefin",
  },
];
const sizes = [
  {
    label: "Small",
    value: "small",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "Large",
    value: "large",
  },
];

const primaryColors = ["#0077B5", "#CC0074", "#FF7D00", "#00C196", "#000000"];
const secondaryColors = ["#333333", "#CC0074", "#FF7D00", "#00C196", "#000000"];

const ResumeEditor: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);

  const [showPalette, setShowPalette] = useState(false);
  const [showPalette2, setShowPalette2] = useState(false);

  const [resumeData, setResumeData] = useState<any>({
    style: {
      primary_color: "#0077B5",
      secondary_color: "#0077B5",
    },
    template: "basic",
    name: "",
    role: "",
    experience: [
      {
        id: 1,
        position: "",
        company: "",
        description: "",
        duration: "",
      },
    ],
    education: [
      {
        id: 1,
        degree: "",
        school: "",
        duration: "",
      },
    ],
    skills: [" "],
  });

  const [on, setOn] = useState(false);

  return (
    <div className="">
      <div className="shadow-2 lg:px-9 md:px-6 px-2 py-3 mb-6">
        <div className="flex space-x-3 items-center relative w-full z-9999">
          <Menu setActive={setActive}>
            <MenuItem
              setActive={setActive}
              active={active}
              item={
                <div className="flex space-x-2 items-center">
                  <HiOutlineTemplate />
                  <span>Template</span>
                  <Icons.arrowDown />
                </div>
              }
              id="template"
            >
              <div className="w-full">
                <ul className="relative flex flex-col gap-2 text-sm !font-normal list-none rounded-md bg-white">
                  <li
                    onClick={() =>
                      setResumeData((d: any) => ({ ...d, template: "basic" }))
                    }
                    className={`${
                      resumeData?.template === "basic"
                        ? "bg-jobseeker/10 text-[#345624]"
                        : "bg-transparent"
                    } cursor-pointer z-30 flex items-center rounded-md gap-1.5 px-2 py-2  text-center`}
                  >
                    <RiLayoutTopLine />
                    Basic Layout
                  </li>
                  <li
                    onClick={() =>
                      setResumeData((d: any) => ({
                        ...d,
                        template: "standard",
                      }))
                    }
                    className={`${
                      resumeData?.template === "standard"
                        ? "bg-jobseeker/10 text-[#345624]"
                        : "bg-transparent"
                    } cursor-pointer z-30 flex items-center rounded-md gap-1.5 px-2 py-2  text-center`}
                  >
                    <AiOutlineLayout />
                    Standard Layout
                  </li>
                  <li
                    onClick={() =>
                      setResumeData((d: any) => ({ ...d, template: "hybrid" }))
                    }
                    className={`${
                      resumeData?.template === "hybrid"
                        ? "bg-jobseeker/10 text-[#345624]"
                        : "bg-transparent"
                    } cursor-pointer z-30 flex items-center rounded-md gap-1.5 px-2 py-2  text-center`}
                  >
                    <TfiLayout />
                    Hybrid Layout
                  </li>
                </ul>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item={
                <div className="flex space-x-2 items-center">
                  <HiOutlineTemplate />
                  <span>Typography</span>
                  <Icons.arrowDown />
                </div>
              }
              id="typography"
            >
              <div className="flex flex-col space-y-4 text-sm w-[300px]">
                <DropdownSelect
                  label="Fonts"
                  placeholder="Select Font..."
                  options={fonts}
                  onSelect={(val) => {
                    console.log(val);
                  }}
                  defaultValue={{ label: "Nunito", value: "nunito" }}
                />
                <DropdownSelect
                  label="Size"
                  placeholder="Select size..."
                  options={sizes}
                  onSelect={(val) => {
                    console.log(val);
                  }}
                  defaultValue={{ label: "Medium", value: "medium" }}
                />
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item={
                <div className="flex space-x-2 items-center">
                  <MdOutlineColorLens />
                  <span>Colors</span>
                  <Icons.arrowDown />
                </div>
              }
              id="colors"
            >
              <div className="flex flex-col space-y-4 text-sm w-[300px]">
                <div>
                  <h6>Primary Colors</h6>
                  <div className="flex gap-3 items-center justify-between">
                    {primaryColors?.map((val, index) => (
                      <span
                        onClick={() => {
                          setResumeData((d: any) => ({
                            ...d,
                            style: {
                              ...d.style,
                              primary_color: val,
                            },
                          }));
                        }}
                        key={index}
                        className={`h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                        style={{ backgroundColor: val }}
                      >
                        {resumeData?.style?.primary_color === val && (
                          <FaCheck className="text-white" />
                        )}
                      </span>
                    ))}
                    <span
                      onClick={() => setShowPalette(!showPalette)}
                      className="h-10 w-10 bg-[#808080] text-white text-lg rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <IoMdColorFilter />
                    </span>
                  </div>
                </div>
                <div className="">
                  <h6>Secondary Colors</h6>
                  <div className="flex gap-3 items-center justify-between">
                    {secondaryColors?.map((val, index) => (
                      <span
                        key={index}
                        onClick={() => {
                          setResumeData((d: any) => ({
                            ...d,
                            style: {
                              ...d.style,
                              secondary_color: val,
                            },
                          }));
                        }}
                        className={`h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                        style={{ backgroundColor: val }}
                      >
                        {resumeData?.style?.secondary_color === val && (
                          <FaCheck className="text-white" />
                        )}
                      </span>
                    ))}

                    <span
                      onClick={() => setShowPalette2(!showPalette2)}
                      className="h-10 w-10 bg-[#808080] text-white text-lg rounded-full flex justify-center items-center cursor-pointer"
                    >
                      <IoMdColorFilter />
                    </span>
                  </div>
                </div>
              </div>
            </MenuItem>

            <MenuItem
              setActive={setActive}
              active={active}
              item={
                <div className="flex space-x-2 items-center">
                  <PiSlidersHorizontalBold />
                  <span>Sections</span>
                  <Icons.arrowDown />
                </div>
              }
              id="sections"
            >
              <div className="px-2 py-1 md:w-[530px] w-full">
                <div className="grid grid-cols-2 gap-8 justify-between text-sm border-b-2 border-stroke pb-5">
                  <div>
                    <h6 className="mb-2">Personal Details</h6>
                    <ul className="space-y-2.5">
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Location"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Phone Number"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Email"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Website"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Linkedin"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Custom 1"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Custom 2"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                    </ul>
                  </div>

                  <div>
                    <ul className="space-y-2.5">
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Picture"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="About Me"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Role"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Work Experience"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Education"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Skills"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Languages"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                      <li>
                        <Switch
                          checked
                          value={on}
                          label="Hobbies"
                          size="sm"
                          onChange={(val) => {
                            setOn(val);
                          }}
                        />
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex gap-2 items-center">
                  <Select4>
                    <option disabled>Select Type</option>
                    <option>Text Section</option>
                    <option>List Section</option>
                  </Select4>
                  <Select4>
                    <option disabled>Select Placement</option>
                    <option>Left Column</option>
                    <option>Right Column</option>
                  </Select4>

                  <button className="border w-[16%] h-[38px] bg-jobseeker/10 text-sm mt-2 flex justify-center items-center rounded-md border-jobseeker hover:bg-jobseeker hover:text-white">
                    <FaPlus />
                  </button>
                </div>
              </div>
            </MenuItem>

            {/* Color Picker */}
            {showPalette && (
              <div
                className={`fixed z-[9999] bg-white flex h-auto left-[56%] top-[30%] flex-col rounded-lg border border-stroke 
                      shadow-default dark:border-strokedark `}
              >
                <Sketch
                  color={resumeData?.style?.primary_color}
                  onChange={(color) =>
                    setResumeData((d: any) => ({
                      ...d,
                      style: {
                        ...d.style,
                        primary_color: color.hex,
                      },
                    }))
                  }
                />
              </div>
            )}
            {showPalette2 && (
              <div
                className={`fixed z-[9999] bg-white flex h-auto left-[56%] top-[35%] flex-col rounded-lg border border-stroke 
                      shadow-default dark:border-strokedark `}
              >
                <Sketch
                  color={resumeData?.style?.secondary_color}
                  onChange={(color) =>
                    setResumeData((d: any) => ({
                      ...d,
                      style: {
                        ...d.style,
                        secondary_color: color.hex,
                      },
                    }))
                  }
                />
              </div>
            )}
          </Menu>
        </div>
      </div>

      <div className="pl-8">
        <div className="flex gap-3">
          <div>
            {resumeData?.template === "basic" && (
              <div className="bg-white py-8 px-6 w-full ">
                <div className="flex w-full justify-between  mb-25">
                  <div className="flex flex-col mt-10">
                    <input
                      className={`border-none bg-white focus:bg-zinc-200 px-3 font-medium text-[40px] dynamic-input`}
                      style={{ color: resumeData?.style?.primary_color }}
                      placeholder="Your Name"
                      value={resumeData?.name}
                      onChange={(e) =>
                        setResumeData((r: any) => ({
                          ...r,
                          name: e.target.value,
                        }))
                      }
                    />
                    <input
                      className={`border-none text-lg bg-white text-black mr-2 uppercase placeholder:text-black focus:bg-zinc-200 px-4 font-bold`}
                      placeholder="YOUR ROLE"
                      value={resumeData?.role}
                      onChange={(e) =>
                        setResumeData((r: any) => ({
                          ...r,
                          role: e.target.value,
                        }))
                      }
                    />
                    <style>
                      {`
              .dynamic-input::placeholder {
               color: ${resumeData?.style?.primary_color}
              }
            `}
                    </style>
                  </div>
                  <div>
                    <UploadResumePhoto
                      user={null}
                      setUrl={(val) =>
                        setResumeData((r: any) => ({ ...r, photo_url: val }))
                      }
                    />
                  </div>
                </div>

                <div>
                  <ProfessionalSummary
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div className="mt-3 mb-9 px-5">
                  <BasicInfo
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div>
                  <Experience
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div className="mt-7">
                  <Education
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div className="mt-7">
                  <Skills
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>
              </div>
            )}

             {resumeData?.template === "standard" && (
              <div className="bg-white py-8 px-6 w-full ">
                <div className="flex w-full gap-x-6  mb-20">
                  
                  <div>
                    <UploadResumePhoto
                      user={null}
                      setUrl={(val) =>
                        setResumeData((r: any) => ({ ...r, photo_url: val }))
                      }
                    />
                  </div>
                  <div className="flex flex-col mt-10">
                    <input
                      className={`border-none bg-white focus:bg-zinc-200 px-3 font-medium text-[40px] dynamic-input`}
                      style={{ color: resumeData?.style?.primary_color }}
                      placeholder="Your Name"
                      value={resumeData?.name}
                      onChange={(e) =>
                        setResumeData((r: any) => ({
                          ...r,
                          name: e.target.value,
                        }))
                      }
                    />
                    <input
                      className={`border-none text-lg bg-white text-black mr-2 uppercase placeholder:text-black focus:bg-zinc-200 px-4 font-bold`}
                      placeholder="YOUR ROLE"
                      value={resumeData?.role}
                      onChange={(e) =>
                        setResumeData((r: any) => ({
                          ...r,
                          role: e.target.value,
                        }))
                      }
                    />
                    <style>
                      {`
              .dynamic-input::placeholder {
               color: ${resumeData?.style?.primary_color}
              }
            `}
                    </style>
                  </div>
                </div>

                <div className="grid grid-cols-4">
                 <div>
                 <div>
                  <ProfessionalSummary
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>
                <div className="mt-3 mb-9 px-5">
                  <BasicInfo
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>
                 </div>
                 <div className="col-span-3">
                 <div>
                  <Experience
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div className="mt-7">
                  <Education
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>

                <div className="mt-7">
                  <Skills
                    resumeData={resumeData}
                    setResumeData={setResumeData}
                  />
                </div>
                 </div>
                </div>

                

              

               
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resume Layout */}

      <style>
        {`
          .dynamic-input-2::placeholder {
            color: ${resumeData?.style?.secondary_color}
              }
            `}
      </style>
    </div>
  );
};

export default ResumeEditor;
