import { useEffect, useRef, useState } from "react";
import Modal from "../components/modal";
import Button, { GradientButton } from "../components/button";
import FieldInput from "../components/form/Input";
import { Select4 } from "../components/form/Select";
import { TextArea } from "../components/form";
import { SlLocationPin } from "react-icons/sl";
import { MdOutlineMailOutline, MdOutlinePhone } from "react-icons/md";
import { FiLink } from "react-icons/fi";
import { BsPlusCircleFill } from "react-icons/bs";
import { RiExpandUpDownLine } from "react-icons/ri";
import { FaCircle, FaCircleMinus, FaRegCircle } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { ScrollArea } from "../components/scroll-area";

// interface Experience {
//   id: number;
//   company: string;
//   position: string;
//   description: string;
//   duration: string;
// }

interface EducationProps {
  id: number;
  school: string;
  degree: string;
  duration: string;
}

interface SkillProps {
  id: number;
  value: string;
}

const mockExperiences = [
  "Developed user-friendly web interfaces using HTML, CSS, and JavaScript.",
  "Optimized website performance through code minification and image compression techniques.",
  "Collaborated with UX designers to implement responsive and visually appealing layouts.",
  "Optimized website performance through code minification and image compression techniques.",
  "Utilized version control systems such as Git to manage source code and collaborate with team members.",
  "Employed frameworks like React and Vue.js for building interactive web applications.",
];

export const ProfessionalSummary: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [showButton, setShowButton] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <div
      onMouseEnter={() => setShowButton(true)}
      onMouseLeave={() => setShowButton(false)}
      className="hover:border border-dashed rounded-md border-spacing-1 px-2"
    >
      {showButton && (
        <div className="flex w-full justify-end">
          <GradientButton
            text="WRITING ASSISTANT"
            className="-mt-3.5"
            onClick={() => {
              setShowModal(true);
            }}
          />
        </div>
      )}
      <textarea
        className={`border-none bg-white focus:bg-zinc-200 px-3 font-medium text-black text-base placeholder:text-black w-full`}
        placeholder="Enter your professional summary"
        value={resumeData?.professional_summary}
        onChange={(e) =>
          setResumeData((resumeData: any) => ({
            ...resumeData,
            professional_summary: e.target.value,
          }))
        }
      />
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Professional Summary</p>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <FieldInput
            label="Role"
            size="small"
            placeholder="E.g UI/UX Designer"
            onChange={(val) => console.log(val)}
            id="role"
          />
          <Select4 label="Level of Experience">
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Expert</option>
          </Select4>
        </div>

        <div className="mb-7.5">
          <TextArea
            value=""
            onChange={(val) => console.log(val)}
            label="Extra Information"
            name="extra-info"
            placeholder="Enter any specific details you want to include. E.g skills, industry"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <GradientButton
            text="Generate Professional Summary"
            className=""
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {}}
          />
        </div>
      </Modal>
    </div>
  );
};

export const BasicInfo: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  return (
    <div className="flex gap-x-3 gap-y-4.5 items-center flex-wrap">
      <div className="flex gap-1 items-center">
        <SlLocationPin className="text-primary text-lg" />
        <input
          className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
          placeholder="Enter Location"
          value={resumeData?.location}
          onChange={(e) =>
            setResumeData((resumeData: any) => ({
              ...resumeData,
              location: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-1 items-center">
        <MdOutlineMailOutline className="text-primary text-lg" />
        <input
          className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
          placeholder="Enter Email"
          value={resumeData?.email}
          onChange={(e) =>
            setResumeData((resumeData: any) => ({
              ...resumeData,
              email: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-1 items-center">
        <MdOutlinePhone className="text-primary text-lg" />
        <input
          className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
          placeholder="Enter Phone number"
          value={resumeData?.phone_number}
          onChange={(e) =>
            setResumeData((resumeData: any) => ({
              ...resumeData,
              phone_number: e.target.value,
            }))
          }
        />
      </div>
      <div className="flex gap-1 items-center">
        <FiLink className="text-primary text-lg" />
        <input
          className={`border-none text-sm bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
          placeholder="Enter URL"
          value={resumeData?.url}
          onChange={(e) =>
            setResumeData((resumeData: any) => ({
              ...resumeData,
              url: e.target.value,
            }))
          }
        />
      </div>
    </div>
  );
};

export const Experience: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [items, setItems] = useState<any[]>(resumeData?.experience);
  const [currentItem, setCurrentItem] = useState<any>(null);
  const [role, setRole] = useState("");
  const [AiDescriptions, setAiDescriptions] = useState<string[]>([]);
  const [selectedDescriptions, setSelectedDescriptions] = useState<string[]>(
    []
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    setItems(resumeData?.experience);
  }, [resumeData?.experience]);
  // Handler to update experience list after reordering

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        experience: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      experience: updatedItems,
    }));
  };

  // Handler to add new experience
  const addExperience = () => {
    const newExperience = {
      id: resumeData?.experience.length + 1,
      position: "",
      company: "",
      description: "",
      duration: "",
    };
    setItems([...items, newExperience]);
    setResumeData(() => ({
      ...resumeData,
      experience: [...resumeData?.experience, newExperience],
    }));
  };
  const [showModal, setShowModal] = useState(false);

  const applyAiList = () => {
    // Convert the selected items array into a string format with list-disc (•)
    const formattedItems = selectedDescriptions
      .map((item) => `• ${item}`)
      .join("\n");

    // Append the formatted items to the existing description
    const updatedItems = items.map((item) =>
      item.id === currentItem?.id
        ? { ...item, ["description"]: `${item.description}\n${formattedItems}` }
        : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      experience: updatedItems,
    }));
    setAiDescriptions([]);
    setSelectedDescriptions([]);
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      experience: updatedItems,
    }));
  };

  const autoResizeTextarea = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      // Reset height to 'auto' to shrink if content was removed
      textarea.style.height = "auto";
      // Set the height based on the scroll height (content height)
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  // Update the height every time the content changes
  useEffect(() => {
    autoResizeTextarea();
  }, [resumeData?.experience[currentItem?.id - 1]?.description]);
  return (
    <div>
      <h6 className="font-bold text-lg uppercase mb-3 ml-4">Experience</h6>
      <div className="flex flex-col gap-4 ml-3">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-dashed rounded-md border-spacing-1 px-2 relative  text-black w-full py-3 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
            onClick={() => setCurrentItem(item)}
          >
            {hoveredItemId === item.id && (
              <div className="flex w-full gap-1 justify-end -mt-8">
                <div className="bg-white flex gap-1 items-center">
                  <GradientButton
                    text="WRITING ASSISTANT"
                    className=""
                    onClick={() => {
                      setShowModal(true);
                    }}
                  />
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {items?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}

                  {items?.length > 1 && (
                    <button className=" h-8 w-8 flex justify-center items-center rounded-full border-none text-white bg-jobseeker cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="flex w-full gap-3 py-2">
              <FaCircle
                style={{ color: resumeData?.style?.secondary_color }}
                className=" text-xs mt-1.5"
              />
              <div className="w-full">
                <input
                  className={`border-none w-full text-base font-bold bg-white text-black dynamic-input-2 focus:bg-zinc-200 px-2 mb-2`}
                  placeholder="Company Name"
                  value={item?.company}
                  style={{ color: resumeData?.style?.secondary_color }}
                  onChange={(e) =>
                    handleInputChange(item.id, "company", e.target.value)
                  }
                />
                <div className="flex items-center mb-2">
                  <input
                    className={`border-none text-base uppercase font-bold bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
                    placeholder="POSITION"
                    value={item?.position}
                    onChange={(e) =>
                      handleInputChange(item.id, "position", e.target.value)
                    }
                  />
                  <input
                    className={`border-none text-sm font-medium bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
                    placeholder="From - Until"
                    value={item.duration}
                    onChange={(e) =>
                      handleInputChange(item.id, "duration", e.target.value)
                    }
                  />
                </div>

                <div className="w-full">
                  <textarea
                    ref={textareaRef}
                    className={`border-none bg-white focus:bg-zinc-200 px-3 font-medium text-black text-base placeholder:text-black w-full`}
                    placeholder="Enter your work experience description"
                    rows={2}
                    value={item?.description}
                    onChange={(e) =>
                      handleInputChange(item.id, "description", e.target.value)
                    }
                    style={{
                      overflow: "hidden",
                      resize: "none",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setAiDescriptions([]);
          setSelectedDescriptions([]);
          setShowModal(false);
        }}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-7.5 text-center">
          <h1 className="font-outfit font-medium text-2xl">
            AI Writing Assistant
          </h1>
          <p className=" text-zinc-600">Work Experience</p>
        </div>

        <div className="mb-5">
          <FieldInput
            label="Role"
            size="small"
            value={role}
            placeholder="Enter your role for bullet point suggestions"
            onChange={(val) => setRole(val)}
            id="role"
          />
        </div>

        {AiDescriptions?.length > 0 && (
          <div className="mb-4">
            <h6 className="font-medium text-black mb-[0.4rem]">
              Select the bullet points you want to apply
            </h6>
            <ScrollArea className="h-[40vh]">
              <ul className="border rounded-md border-stroke px-2 py-2 space-y-2 list-disc list-outside">
                {AiDescriptions.map((val, index) => (
                  <div
                    key={index}
                    className={`bg-gray dark:text-white flex gap-3 items-center rounded w-full p-2.5 mb-2 cursor-pointer ${
                      selectedDescriptions?.includes(val)
                        ? "border border-primary"
                        : ""
                    }`}
                    onClick={() => {
                      setSelectedDescriptions(
                        selectedDescriptions.includes(val)
                          ? selectedDescriptions.filter(
                              (item: string) => item !== val
                            )
                          : [...selectedDescriptions, val]
                      );
                    }}
                  >
                    <div>
                      {selectedDescriptions.includes(val) ? (
                        <FaRegCheckCircle className="text-primary" />
                      ) : (
                        <FaRegCircle />
                      )}
                    </div>

                    {val}
                  </div>
                ))}
              </ul>
            </ScrollArea>
          </div>
        )}

        <div className="flex flex-col gap-3 justify-center items-center">
          <GradientButton
            text="Generate Bullet Points"
            className="w-[80%]"
            props={{ padding: "py-2.5 px-9" }}
            onClick={() => {
              setAiDescriptions(mockExperiences);
            }}
          />
          {selectedDescriptions.length > 0 && (
            <Button
              rounded
              onClick={() => {
                applyAiList();
                setShowModal(false);
              }}
              width="[80%]"
            >
              Apply Selected Descriptions
            </Button>
          )}
        </div>
      </Modal>
    </div>
  );
};

export const Education: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const [items, setItems] = useState<EducationProps[]>(resumeData?.education);
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    setItems(resumeData?.education);
  }, [resumeData?.education]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      //   const reorderedItems = updatedItems.map((item, index) => ({
      //     ...item,
      //     position: index + 1
      // }));

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        education: updatedItems,
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      education: updatedItems,
    }));
  };

  // Handler to add new education
  const addExperience = () => {
    const newEducation = {
      id: resumeData?.education?.length + 1,
      degree: "",
      school: "",
      duration: "",
    };
    setResumeData(() => ({
      ...resumeData,
      education: [...resumeData?.education, newEducation],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      education: updatedItems,
    }));
  };
  return (
    <div>
      <h6 className="font-bold text-lg uppercase mb-3 ml-4">Education</h6>
      <div className="flex flex-col gap-4 ml-3">
        {items.map((item, _index) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } hover:border border-dashed rounded-md border-spacing-1 px-2 relative  text-black w-full py-3 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            {hoveredItemId === item.id && (
              <div className="flex w-full gap-1 justify-end -mt-8">
                <div className="bg-white flex gap-1 items-center">
                  <button
                    onClick={addExperience}
                    className="h-8 w-8 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-2xl"
                  >
                    <BsPlusCircleFill />
                  </button>
                  {resumeData?.education?.length > 1 && (
                    <button
                      onClick={() => {
                        handleRemove(item.id);
                      }}
                      className="h-8 w-8 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-2xl"
                    >
                      <FaCircleMinus />
                    </button>
                  )}
                  {resumeData?.education?.length > 1 && (
                    <button className=" h-8 w-8 flex justify-center items-center rounded-full border-none text-white bg-jobseeker cursor-grab">
                      <RiExpandUpDownLine />
                    </button>
                  )}
                </div>
              </div>
            )}
            <div className="flex gap-3 py-2">
              <FaCircle
                style={{ color: resumeData?.style?.secondary_color }}
                className=" text-xs mt-1.5"
              />
              <div className="w-full">
                <input
                  className={`border-none w-full text-base font-bold bg-white text-black dynamic-input-2 focus:bg-zinc-200 px-2 mb-2`}
                  placeholder="School"
                  value={item?.school}
                  style={{ color: resumeData?.style?.secondary_color }}
                  onChange={(e) =>
                    handleInputChange(item.id, "school", e.target.value)
                  }
                />
                <div className="flex items-center">
                  <input
                    className={`border-none text-base uppercase font-bold bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
                    placeholder="DEGREE"
                    value={item?.degree}
                    onChange={(e) =>
                      handleInputChange(item.id, "degree", e.target.value)
                    }
                  />
                  <input
                    className={`border-none text-sm font-medium bg-white text-black placeholder:text-black focus:bg-zinc-200 px-2`}
                    placeholder="From - Until"
                    value={item.duration}
                    onChange={(e) =>
                      handleInputChange(item.id, "duration", e.target.value)
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Skills: React.FC<{
  resumeData: any;
  setResumeData: React.Dispatch<React.SetStateAction<any | null>>;
}> = ({ resumeData, setResumeData }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const [items, setItems] = useState<SkillProps[]>(
    resumeData?.skills.map((val: string) => ({
      id: resumeData?.skills?.length + 1,
      value: val,
    }))
  );
  const [draggingItem, setDraggingItem] = useState<any | null>(null);

  useEffect(() => {
    setItems(
      resumeData?.skills.map((val: string, index: number) => ({
        id: index + 1,
        value: val,
      }))
    );
  }, [resumeData?.skills]);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    item: any
  ) => {
    setDraggingItem(item);
    e.dataTransfer.setData("text/plain", "");
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement | HTMLButtonElement>
  ) => {
    e.preventDefault();
  };

  const handleDrop = (
    _e: React.DragEvent<HTMLDivElement | HTMLButtonElement>,
    targetItem: any
  ) => {
    if (!draggingItem) return;

    const currentIndex = items.indexOf(draggingItem);
    const targetIndex = items.indexOf(targetItem);

    if (currentIndex !== -1 && targetIndex !== -1) {
      const updatedItems = [...items];
      updatedItems.splice(currentIndex, 1);
      updatedItems.splice(targetIndex, 0, draggingItem);

      setItems(updatedItems);
      setResumeData(() => ({
        ...resumeData,
        skills: updatedItems.map((item: any) => item.value),
      }));
    }
  };
  const handleRemove = (id: number) => {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);
    setResumeData(() => ({
      ...resumeData,
      skills: updatedItems.map((item: any) => item.value),
    }));
  };

  // Handler to add new education
  const addSkill = () => {
    setResumeData(() => ({
      ...resumeData,
      skills: [...resumeData?.skills, ""],
    }));
  };

  // Handle input change for specific item
  const handleInputChange = (id: number, field: string, value: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setItems(updatedItems);
    setResumeData((prev: any) => ({
      ...prev,
      skills: updatedItems.map((item: any) => item.value),
    }));
  };
  return (
    <div className="hover:border border-dashed rounded-md border-spacing-1 px-2 py-3">
      <h6 className="font-bold text-lg uppercase mb-3 ml-4">Skills</h6>
      <div className="flex flex-wrap gap-x-4 gap-y-0 ml-3">
        {items.map((item, index) => (
          <div
            key={index}
            onMouseEnter={() => setHoveredItemId(item.id)} // Set hovered item id
            onMouseLeave={() => setHoveredItemId(null)}
            className={`item ${
              item.id === draggingItem?.id ? "shadow-3" : ""
            } relative  text-black py-3 `}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, item)}
            onDrop={(e) => handleDrop(e, item)}
            onDragEnd={handleDragEnd}
            onDragOver={handleDragOver}
          >
            <div className="py-2 bg-zinc-200 rounded-md">
              {hoveredItemId === item.id && (
                <div className="flex w-full gap-1 justify-end -mt-4">
                  <div className="bg-white/15 flex gap-1 items-center">
                    <button
                      onClick={addSkill}
                      className="h-6 w-6 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-xl"
                    >
                      <BsPlusCircleFill />
                    </button>
                    {resumeData?.skills?.length > 1 && (
                      <button
                        onClick={() => {
                          handleRemove(item.id);
                        }}
                        className="h-6 w-6 flex justify-center items-center border-none text-jobseeker/90 hover:text-jobseeker text-xl"
                      >
                        <FaCircleMinus />
                      </button>
                    )}
                    {resumeData?.skills?.length > 1 && (
                      <button className=" h-6 w-6 flex justify-center items-center rounded-full border-none text-white bg-jobseeker cursor-grab">
                        <RiExpandUpDownLine />
                      </button>
                    )}
                  </div>
                </div>
              )}
              <input
                className={`border-none text-base text-black placeholder:text-black bg-zinc-200 px-2`}
                placeholder="Enter Skill"
                value={item.value}
                onChange={(e) =>
                  handleInputChange(item.id, "value", e.target.value)
                }
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
