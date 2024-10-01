import React, { useState } from "react";
import { Sketch } from "@uiw/react-color"; // Import from the @uiw/react-color package
import { MdOutlineColorLens, MdOutlineDragIndicator } from "react-icons/md";
import DraggableList from "../../components/DraggableList";
import { HoveredLink, Menu, MenuItem } from "../../AnimatedUi/AnimatedNav";
import { HiOutlineTemplate } from "react-icons/hi";
import { Icons } from "../../components/icons";
import { DropdownSelect } from "../../components/form/customDropdown";
import { IoMdColorFilter } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";

interface Experience {
  id: number;
  title: string;
  company: string;
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
  const [color, setColor] = useState("#0A66C2");
  const [name, setName] = useState("Your Name");
  const [role, setRole] = useState("Your Role");

  const [resumeData, setResumeData] = useState({
    primary_color: "#0077B5",
    secondary_color: "#333333",
  });

  // Example of initial items in the experience section
  const [experiences, setExperiences] = useState<Experience[]>([
    { id: 1, title: "Software Developer", company: "Company A" },
    { id: 2, title: "Frontend Engineer", company: "Company B" },
  ]);

  // Handler to update experience list after reordering
  const handleReorder = (newOrder: Experience[]) => {
    setExperiences(newOrder);
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: experiences.length + 1,
      title: "New Job Title",
      company: "New Company",
    };
    setExperiences([...experiences, newExperience]);
  };

  return (
    <div className="">
      <div className="shadow-2 px-4.5 py-3 mb-6">
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
              id="services"
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink href="/web-dev">Web Development</HoveredLink>
                <HoveredLink href="/interface-design">
                  Interface Design
                </HoveredLink>
                <HoveredLink href="/seo">
                  Search Engine Optimization
                </HoveredLink>
                <HoveredLink href="/branding">Branding</HoveredLink>
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
                        onClick={() =>
                          setResumeData((d: any) => ({
                            ...d,
                            primary_color: val,
                          }))
                        }
                        key={index}
                        className={`h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                        style={{ backgroundColor: val }}
                      >
                        {resumeData?.primary_color === val && <FaCheck className="text-white" />}
                      </span>
                    ))}
                    <span className="h-10 w-10 bg-[#808080] text-white text-lg rounded-full flex justify-center items-center cursor-pointer">
                      <IoMdColorFilter />
                    </span>
                  </div>
                </div>
                <div>
                  <h6>Secondary Colors</h6>
                  <div className="flex gap-3 items-center justify-between">
                    {secondaryColors?.map((val, index) => (
                      <span
                        key={index}
                        onClick={() =>
                          setResumeData((d: any) => ({
                            ...d,
                            secondary_color: val,
                          }))
                        }
                        className={`h-9 w-9 rounded-full flex justify-center items-center cursor-pointer`}
                        style={{ backgroundColor: val }}
                      >
                        {resumeData?.secondary_color === val && <FaCheck className="text-white" />}
                      </span>
                    ))}
                    <span className="h-10 w-10 bg-[#808080] text-white text-lg rounded-full flex justify-center items-center cursor-pointer">
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
                  <HiOutlineTemplate />
                  <span>Sections</span>
                  <Icons.arrowDown />
                </div>
              }
              id="sections"
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
          </Menu>
        </div>
      </div>
      {/* Color Picker */}
      {/* <div className="mb-4">
        <Sketch
          color={color}
          onChange={(color) => setColor(color.hex)}
        //   triangle="hide"
        />
      </div> */}

      {/* Resume Layout */}
      <div
        className="border-2 border-gray-200 p-4 rounded-lg"
        style={{ color: color }} // Use the selected color for the resume text
      >
        {/* Editable Name and Role */}
        <div className="text-3xl font-bold">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="outline-none w-full"
            placeholder="Your Name"
          />
        </div>
        <div className="text-xl">
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="outline-none w-full"
            placeholder="Your Role"
          />
        </div>

        {/* Experience Section */}
        <div className="mt-6">
          <h2 className="font-bold text-lg">Experience</h2>

          {/* Use DraggableList to reorder experiences */}
          <DraggableList initialItems={experiences} onReorder={handleReorder} />

          {/* Add Experience Button */}
          <button
            className="flex items-center mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={addExperience}
          >
            <span className="mr-2">+</span>
            Add Experience
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;
