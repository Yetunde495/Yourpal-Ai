import { BiSearch, BiSolidArchiveIn } from "react-icons/bi";
import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";
import { TableLoader } from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import paginate from "../../lib/utils/paginate";
import { useQuery } from "@tanstack/react-query";
import { DropdownSelect } from "../../components/form/customDropdown";
import { FaCircleCheck, FaStar, FaTrophy } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import Popover from "../../components/Popover";
import { IoMdInformationCircleOutline } from "react-icons/io";
import cancelIcon from "../../assets/svg/icon-cancel.svg";
import { ActionTooltip } from "../../components/action-tooltip";
import { Icons } from "../../components/icons";
import AlertDialog from "../../components/modal/AlertDialog";
import MatchScoreTable from "./MatchScoreTable";
import { ScrollArea } from "../../components/scroll-area";
import BtnIcon from "../../assets/btnIcon.png";
import { Textarea } from "../../components/textarea";
import Dropdown from "../../components/Dropdown2";
import { TooltipTrigger } from "../../components/tooltip-new";

const statusOptions = [
  {
    text: "Potentials",
    icon: <FaStar className="text-primary" />,
  },
  {
    text: "Hired",
    icon: <FaCircleCheck className="text-success" />,
  },
  {
    text: "Shortlisted",
    icon: <FaTrophy className="text-warning" />,
  },
  {
    text: "Rejected",
    icon: <MdCancel className="text-danger" />,
  },
  {
    text: "Archive",
    icon: <BiSolidArchiveIn className="text-[#545454CC]" />,
  },
];

const sampleData = [
  {
    status: "Potentials",
    count: "1",
    id: 1,
    job: {
      position: "IT Manager",
      companyName: "ABCD",
    },
  },
  {
    status: "Rejected",
    count: "2",
    id: 2,
    job: null,
  },
];

const uploadedFiles = [{ name: "file1.pdf" }, { name: "hello.pdf" }];

const TalentHub: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, setSelectedResume] = useState<any>(null);
  const [matchScoreAlert, setMatchScoreAlert] = useState(false);
  const [talentMatchAlert, setTalentMatchAlert] = useState(false);
  const [removeResume, setRemoveResume] = useState(false);
  const [resumeInput, setResumeInput] = useState(false);
  const [matchJob, setMatchJob] = useState(false);

  const [search, setSearch] = useState<string>("");

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isFetching } = useQuery(
    ["ALL CLASSROOMS", search, page, itemsPerPage],
    () => {},
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data: any) => {
        setAllResumes(data?.resumes);
      },
      onError: (err: any) => {
        toast(
          <Notification variant="error" title="Request Failed!">
            {err.message}
          </Notification>,
          {
            type: "error",
            hideProgressBar: true,
            toastId: Date.now() + "@USER_FILTER_ERROR",
          }
        );
      },
    }
  );

  const pagination = paginate(
    data?.meta.total_no_items,
    Number(page),
    Number(itemsPerPage)
  );
  return (
    <section>
      <div className="flex gap-2 items-center pt-4">
        <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
          Talent Hub
        </h1>
        <div className="mt-2">
          <Popover
            icon={<IoMdInformationCircleOutline size={24} className="" />}
            title="Job Hub"
            position="bottom"
            onClick={() => {}}
          >
            Lorem ipsum dolor sit amet
          </Popover>
        </div>
      </div>
      <section className="sm:block py-8">
        <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap">
          <div className="block mt-2">
            <div className="relative">
              <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                <BiSearch />
              </button>

              <input
                type="text"
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
              />
            </div>
          </div>

          <div className="ml-auto">
            <button
              onClick={() => setTalentMatchAlert(true)}
              className="rounded-full bg-indigo-600 px-3.5 w-[200px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              New Talent Match
            </button>
          </div>
        </div>

        <div className="mt-10">
          {isFetching ? (
            <TableLoader />
          ) : allResumes?.length === 0 ? (
            <>
              <Table show>
                <Table.TableRow>
                  <Table.Row>Status</Table.Row>
                  <Table.Row>Job</Table.Row>
                  <Table.Row>Resume Count</Table.Row>
                  <Table.Row>Actions</Table.Row>
                  <Table.Row>Match Score</Table.Row>
                  <Table.Row>More Info</Table.Row>
                </Table.TableRow>

                <Table.TableItems>
                  {sampleData?.map((item: any, index: number) => (
                    <Table.CellRows
                      useSelectOption={false}
                      onClick={() => setSelectedResume(item)}
                      key={item?.id + "-" + index}
                    >
                      <Table.Cell isAction>
                        <DropdownSelect
                          options={
                            statusOptions?.map((val: any) => ({
                              label: (
                                <div className="w-full flex gap-2 items-center">
                                  <span>{val?.icon}</span>
                                  <span>{val?.text}</span>
                                </div>
                              ),
                              value: val?.text,
                            })) || []
                          }
                          label=""
                          border={false}
                          onSelect={(_val) => {}}
                          defaultValue={{
                            label: (
                              <div className="w-full flex gap-2 items-center">
                              <span>
                                {item?.status === "Potentials" ? (
                                  <FaStar className="text-primary" />
                                ) : item?.status === "Hired" ? (
                                  <FaCircleCheck className="text-success" />
                                ) : item?.status === "Rejected" ? (
                                  <MdCancel className="text-danger" />
                                ) : item?.status === "Shortlisted" ? (
                                  <FaTrophy className="text-warning" />
                                ) : (
                                  <BiSolidArchiveIn className="text-[#545454CC]" />
                                )}
                              </span>
                              <span>{item?.status}</span>
                            </div>
                            ),
                            value: item?.status,
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell isAction>
                        {item?.job ? (
                          <div>
                            <p>{item?.job?.position}</p>
                            <p>{item?.job?.companyName}</p>
                          </div>
                        ) : (
                          <div>
                            <img src={cancelIcon} className="-ml-4 -mt-3" />
                          </div>
                        )}
                      </Table.Cell>
                      <Table.Cell>{item?.count}</Table.Cell>
                      <Table.Cell>
                        <CellAction id={item.id} />
                      </Table.Cell>
                      <Table.Cell>
                        <ActionTooltip label="View" side="top">
                          <div
                            onClick={() => setMatchScoreAlert(true)}
                            className="group flex p-2 items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
                          >
                            <Icons.passwordEye className="h-4 w-4 group-hover:text-black" />
                            <span className="sr-only">View</span>
                          </div>
                        </ActionTooltip>
                      </Table.Cell>
                      <Table.Cell>
                        <ActionTooltip label="Info" side="top">
                          <Link
                            to=""
                            // href={`${pathname}/${id}`}
                            className="group flex p-2 items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
                          >
                            <Icons.info className="h-4 w-4 text-[#5272EA]" />
                            <span className="sr-only">Info</span>
                          </Link>
                        </ActionTooltip>
                      </Table.Cell>
                    </Table.CellRows>
                  ))}
                </Table.TableItems>
              </Table>

              <TablePagination
                data={allResumes}
                page={page}
                pagination={pagination}
                setPage={setPage}
                setPageLimit={setItemsPerPage}
                pageLimit={itemsPerPage}
              />
              {matchScoreAlert && (
                <AlertDialog
                  show={matchScoreAlert}
                  onHide={() => setMatchScoreAlert(false)}
                  title="Job Match Score"
                >
                  <MatchScoreTable
                    setMatchScoreAlert={setMatchScoreAlert}
                    matchJob={matchJob}
                    setMatchJob={setMatchJob}
                  />
                </AlertDialog>
              )}
            </>
          ) : (
            <Table.NoData
              onAdd={() => navigate(`/app/tutors/courses/courseupload`)}
              hideButton={true}
              show={
                allResumes === undefined ||
                allResumes === null ||
                allResumes?.length === 0
              }
            >
              No Class found. Create one now by clicking on the Create Class
              button.
            </Table.NoData>
          )}
        </div>
      </section>

      {matchJob && (
        <AlertDialog
          show={matchJob}
          onHide={() => {
            setMatchJob(false);
            setMatchScoreAlert(false);
          }}
        >
          <div>
            <h3>Match Job Descripton</h3>
            <div className="bg-[#E4E4E4] rounded-lg px-4 mt-10 py-5">
              <div className="flex justify-start">
                <p className="text-xs mb-5">
                  Job Description you’d like to Match the resume to
                  (Recommended){" "}
                </p>
              </div>
              <Textarea
                placeholder="Paste job description/title here..."
                className="md:h-40 border-[#091540] border-[0.08rem] w-full h-20 mb-5"
              />
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button className="text-sm" onClick={() => setMatchJob(false)}>
                Close
              </button>

              <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                <span className="relative px-5 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                  <img src={BtnIcon} /> Generate
                </span>
              </button>
            </div>
          </div>
        </AlertDialog>
      )}

      {talentMatchAlert && (
        <AlertDialog
          show={talentMatchAlert}
          onHide={() => setTalentMatchAlert(false)}
        >
          <div className="mb-10">
            <h2>New Talent Match</h2>
            <p className="text-xs mt-3">
              Importing Maximum of 10 Resumes / Cv by selecting from Saved
              Resume or Uploading
            </p>
          </div>

          <ScrollArea className="h-[50vh]">
            <div className="bg-[#E4E4E4] rounded-lg px-4 py-2">
              <div
                className={`flex items-center ${
                  resumeInput ? "justify-end" : "justify-between"
                }`}
              >
                {!resumeInput && (
                  <div className="flex items-center gap-1">
                    <Icons.checkCircle className="h-4 w-4 " />
                    <p className="text-xs">Select From Your Saved Resume</p>
                  </div>
                )}

                <div className=" flex items-center">
                  <ActionTooltip label="Replace" side="top">
                    <div className="group flex p-2 items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer">
                      <Icons.sync className="h-4 w-4" />
                      <span className="sr-only">Replace</span>
                    </div>
                  </ActionTooltip>
                  <ActionTooltip label="Choose an option" side="top">
                    <Dropdown
                      icon={
                        <TooltipTrigger asChild>
                          <Icons.sort />
                        </TooltipTrigger>
                      }
                      bg={false}
                    >
                      <div className="flex flex-col py-2 text-start px-4">
                        <p className="text-xs hover:bg-[#f1ebf7] p-2 rounded-md cursor-pointer">
                          Select from saved Resume
                        </p>
                        <p
                          className="text-xs hover:bg-[#f1ebf7] p-2 rounded-md cursor-pointer"
                          onClick={() => {
                            setResumeInput(true);
                          }}
                        >
                          Upload resume
                        </p>
                      </div>
                    </Dropdown>
                  </ActionTooltip>
                </div>
              </div>
              {resumeInput && (
                <div className="col-span-full mt-10">
                  <div className=" flex items-center gap-2">
                    <Icons.addDoc />
                    <label
                      htmlFor="cover-photo"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Upload your Resume
                    </label>
                  </div>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 bg-[#ecedee]">
                    <div className="text-center">
                      <div className="mt-4 flex text-sm leading-6 text-gray-600">
                        <p className="pl-1">
                          Drag and drop File here or&nbsp;{" "}
                        </p>

                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md  font-semibold text-indigo-600 focus-within:outline-none hover:text-indigo-500"
                        >
                          <span>Click to Upload</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                      </div>
                      <p className="text-xs leading-5 text-gray-600">
                        Supported format: PDF, DOC, DOCX
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 my-5">
                {uploadedFiles.map((file, id) => (
                  <div key={id}>
                    <div className="flex items-center gap-2 px-2.5 py-1.5 bg-[#FFFFFF] rounded-full text-xs">
                      {file.name}{" "}
                      <span
                        onClick={() => {
                          setRemoveResume(true);
                          setTalentMatchAlert(false);
                        }}
                      >
                        <Icons.cancel className="cursor-pointer" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#E4E4E4] rounded-lg px-4 mt-10 py-5">
              <div className="flex justify-start">
                <p className="text-xs mb-5">
                  Job Description you’d like to Match the resume to
                  (Recommended){" "}
                </p>
              </div>
              <Textarea
                placeholder="Paste job description/title here..."
                className="md:h-40 border-[#091540] border-[0.08rem] w-full h-20 mb-5"
              />
            </div>
            <div className="mt-10 flex items-center justify-between">
              <button
                className="text-sm"
                onClick={() => {
                  setTalentMatchAlert(false);
                }}
              >
                Close
              </button>
              {uploadedFiles.length != 0 ? (
                <button className="group relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-[#60BEE2] via-[#5E4D84] to-[#8FC2DA] group-hover:from-[#60BEE2] group-hover:via-[#5E4D84] group-hover:to-[#8FC2DA] hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800">
                  <span className="relative px-5 py-1 transition-all ease-in duration-200 bg-white dark:bg-gray-900 rounded-full group-hover:bg-opacity-0 flex gap-2">
                    <img src={BtnIcon} /> Generate
                  </span>
                </button>
              ) : (
                <button className="border-[#8343CC] border text-[#8343CC] hover:text-white text-sm px-5 rounded-full py-1 hover:bg-[#8343CC]">
                  Continue
                </button>
              )}
            </div>
          </ScrollArea>
        </AlertDialog>
      )}

      {removeResume && (
        <AlertDialog show={removeResume} onHide={() => setRemoveResume(false)}>
          <h3 className="text-base mb-3">Remove Resume</h3>
          <p className="text-xs mb-5">
            Are you sure you want to remove this resume from bulk?
          </p>{" "}
          <div className="flex gap-5 justify-center items-center flex-col mt-10">
            <button className="border-red-500 border text-red-500 text-sm px-5 rounded-full py-1 font-normal w-[60%]">
              Yes, Remove
            </button>
            <button className="border-[#D4D4D4] border text-[#928f8f] text-sm px-5 rounded-full py-1 font-normal w-[60%]">
              No, Cancel
            </button>
          </div>
        </AlertDialog>
      )}
    </section>
  );
};

const CellAction = ({ id }: { id: string }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleDelete = (id: string | string[]) => {
    if (Array.isArray(id)) {
      // Logic to delete multiple items
      id.forEach((itemId) => {
        console.log(`Deleting item with id: ${itemId}`);
        // Add your delete logic here
      });
    } else {
      // Logic to delete a single item
      console.log(`Deleting item with id: ${id}`);
      // Add your delete logic here
    }

    setDeleteAlert(false);
  };

  return (
    <div className="flex items-center gap-2">
      <ActionTooltip label="Edit" side="top">
        <Link
          to=""
          // href={`${pathname}/${id}`}
          className="group flex p-2 items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
        >
          <Icons.edit className="h-4 w-4 group-hover:text-black" />
          <span className="sr-only">Edit</span>
        </Link>
      </ActionTooltip>
      <ActionTooltip label="Download" side="top">
        <Link
          to=""
          // href={`${pathname}/${id}`}
          className="group flex p-2 items-center justify-center transition-colors hover:bg-gray-100 cursor-pointer"
        >
          <Icons.download className="h-4 w-4 group-hover:text-black" />
          <span className="sr-only">Download</span>
        </Link>
      </ActionTooltip>
      <ActionTooltip label="Delete" side="top">
        <div
          onClick={() => setDeleteAlert(true)}
          className="group flex p-2 items-center justify-center  transition-colors cursor-pointer"
        >
          <Icons.trash className="h-4 w-4 group-hover:text-red-500" />
          <span className="sr-only">Delete</span>
        </div>
      </ActionTooltip>
      {deleteAlert && (
        <AlertDialog
          show={deleteAlert}
          onHide={() => setDeleteAlert(false)}
          title=""
        >
          <h3 className="text-base mb-3">Delete Resume</h3>
          <p className="text-xs mb-5">
            Are you sure you want to remove this Resume?
          </p>
          <div className="flex gap-5 justify-center items-center flex-col mt-10">
            <button className="border-red-500 border text-red-500 text-sm px-5 rounded-full py-1 font-normal w-[60%]">
              Yes, Delete
            </button>
            <button className="border-[#D4D4D4] border text-[#928f8f] text-sm px-5 rounded-full py-1 font-normal w-[60%]">
              No, Cancel
            </button>
          </div>
        </AlertDialog>
      )}
    </div>
  );
};

export default TalentHub;
