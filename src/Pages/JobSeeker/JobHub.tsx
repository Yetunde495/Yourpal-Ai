import { BiSearch, BiSolidArchiveIn } from "react-icons/bi";
import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";
import { TableLoader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import paginate from "../../lib/utils/paginate";
import { useQuery } from "@tanstack/react-query";
// import Dropdown from "../../components/Dropdown2";
import { DropdownSelect } from "../../components/form/customDropdown";
import { FaCircleCheck, FaStar, FaTrophy } from "react-icons/fa6";
import { MdCancel, MdOutlineFileDownload } from "react-icons/md";
import Popover from "../../components/Popover";
import { IoMdInformationCircleOutline } from "react-icons/io";
import cancelIcon from "../../assets/svg/icon-cancel.svg";
import { BsEye } from "react-icons/bs";
import { Tooltip2 } from "../../components/Tooltip";
import { LiaEdit } from "react-icons/lia";
import Button from "../../components/button";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import CoverLetterDetails from "../Workspace/coverletterDetails";
import CompanyOverview from "../Workspace/companyOverview";
import InterviewTips from "../Workspace/InterviewTips";
import ApplicationInfo from "../Workspace/ApplicationInfo";
import DefaultLayout from "../../layout/DefaultLayout";
import NewApplicationKit from "./NewApplicant";
import Delete from "../../components/modal/Delete";
import Modal from "../../components/modal";
import FieldInput from "../../components/form/Input";

const statusOptions = [
  {
    text: "Interested",
    icon: <FaStar className="text-primary" />,
  },
  {
    text: "Applied",
    icon: <FaCircleCheck className="text-success" />,
  },
  {
    text: "Offer",
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
    status: "Interested",
    name: "Resume 1",
    job: {
      position: "IT Manager",
      companyName: "ABCD",
    },
    created_at: "2024-08-26T22:46:24.684Z",
    last_updated: "2024-08-26T22:46:24.684Z",
    tags: [
      "HR",
      "expert",
      "recruitment",
      "onboarding",
      "compliance",
      "policies",
      "structure",
    ],
    cover_letter: `Dear [Employer's Name],

I am excited to apply for the Human Resources position at [Company Name]. With [X years] of experience in HR management, including recruitment, employee relations, and performance management, I am confident in my ability to contribute effectively to your team.

In my previous role at [Your Current/Previous Company], I streamlined the onboarding process, reducing turnover by 20% and improving employee satisfaction. I am particularly drawn to [Company Name] because of your commitment to diversity and inclusion, which aligns with my passion for creating a positive work environment.

I look forward to the opportunity to discuss how my skills and experiences can support your HR goals.

Thank you for considering my application.

Best regards,  
Ahmed Mohammad AlDhraif AlShamsi


    `,
  },
  {
    status: "Rejected",
    name: "Resume 2",
    job: null,
  },
];

const JobHub: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [selectedResume, setSelectedResume] = useState<any>(null);

  const [search, setSearch] = useState<string>("");

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [letterModal, setLetterModal] = useState(false);
  const [interviewtipModal, setInterviewtipModal] = useState(false);
  const [infoView, setInfoView] = useState(false);
  const [companyoverviewModal, setCompanyoverviewModal] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [renameModal, setRenameModal] = useState(false);

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
    <DefaultLayout>
      <section className="pb-6 px-4 md:px-6">
        <div className="flex gap-2 items-center pt-4">
          <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
            Job Hub
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
              <Button
                rounded
                variant="jobseeker"
                onClick={() => {
                  setAddNew(true);
                }}
                size="lg"
              >
                New Applicant Kit
              </Button>
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
                    <Table.Row>Resume Name</Table.Row>
                    <Table.Row>Job</Table.Row>
                    <Table.Row>Cover Letter</Table.Row>
                    <Table.Row>Resume</Table.Row>
                    <Table.Row>Company Overview</Table.Row>
                    <Table.Row>Interview Tips</Table.Row>
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
                                    {item?.status === "Interested" ? (
                                      <FaStar className="text-primary" />
                                    ) : item?.status === "Applied" ? (
                                      <FaCircleCheck className="text-success" />
                                    ) : item?.status === "Rejected" ? (
                                      <MdCancel className="text-danger" />
                                    ) : item?.status === "Offer" ? (
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
                        <Table.Cell>{item?.name}</Table.Cell>
                        <Table.Cell isAction>
                          {item?.job ? (
                            <div className="font-medium">
                              <p>{item?.job?.position}</p>
                              <p className="text-sm text-primary">
                                {item?.job?.companyName}
                              </p>
                            </div>
                          ) : (
                            <div>
                              <img src={cancelIcon} className="-ml-4 -mt-3" />
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex w-full items-center justify-center">
                            <div>
                              <Tooltip2 text="View">
                                <button
                                  onClick={() => setLetterModal(true)}
                                  className="hover:bg-stone-200 rounded-md p-[2.5px]"
                                >
                                  <BsEye />
                                </button>
                              </Tooltip2>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex w-full gap-1 items-center">
                            <Tooltip2 text="Edit">
                              <button
                                onClick={() => {}}
                                className="hover:bg-stone-200 rounded-md p-[2.5px]"
                              >
                                <LiaEdit size={20} />
                              </button>
                            </Tooltip2>
                            <Tooltip2 text="Download">
                              <button
                                onClick={() => {}}
                                className="hover:bg-stone-200 rounded-md p-[2.5px]"
                              >
                                <MdOutlineFileDownload size={20} />
                              </button>
                            </Tooltip2>
                          </div>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex w-full items-center justify-center">
                            <div>
                              <Tooltip2 text="View">
                                <button
                                  onClick={() => setCompanyoverviewModal(true)}
                                  className="hover:bg-stone-200 rounded-md p-[2.5px]"
                                >
                                  <BsEye />
                                </button>
                              </Tooltip2>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex w-full items-center justify-center">
                            <div>
                              <Tooltip2 text="View">
                                <button
                                  onClick={() => setInterviewtipModal(true)}
                                  className="hover:bg-stone-200 rounded-md p-[2.5px]"
                                >
                                  <BsEye />
                                </button>
                              </Tooltip2>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex w-full items-center justify-center">
                            <StaggeredDropDown>
                              <AnimatedOption
                                text="Rename Resume"
                                onClick={() => setRenameModal(true)}
                              />
                              <AnimatedOption
                                text="View More Info"
                                onClick={() => setInfoView(true)}
                              />
                              <AnimatedOption
                                text="Delete"
                                onClick={() => setDeleteModal(true)}
                              />
                            </StaggeredDropDown>
                          </div>
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
        {letterModal && (
          <CoverLetterDetails
            show={letterModal}
            setShow={() => {
              setSelectedResume(null);
              setLetterModal(false);
            }}
            resumeData={selectedResume}
          />
        )}
        {companyoverviewModal && (
          <CompanyOverview
            show={companyoverviewModal}
            setShow={() => {
              setSelectedResume(null);
              setCompanyoverviewModal(false);
            }}
            resumeData={selectedResume}
          />
        )}
        {interviewtipModal && (
          <InterviewTips
            show={interviewtipModal}
            setShow={() => {
              setSelectedResume(null);
              setInterviewtipModal(false);
            }}
            resumeData={selectedResume}
          />
        )}
        {infoView && (
          <ApplicationInfo
            show={infoView}
            setShow={() => {
              setSelectedResume(null);
              setInfoView(false);
            }}
            resumeData={selectedResume}
          />
        )}
        {addNew && (
          <NewApplicationKit show={addNew} onClose={() => setAddNew(false)} />
        )}
        {renameModal && (
          <div className="">
            <Modal
              show={renameModal}
              onHide={() => setRenameModal(false)}
              props={{ roundedMd: true }}
              size="w-full lg:max-w-[600px]"
            >
              <div className="mb-6 text-center">
                <h1 className="font-outfit font-medium text-[30px]">
                  Edit Resume Name
                </h1>
              </div>

              <div className="mb-9">
                <FieldInput
                  label="Resume Name"
                  placeholder="E.g Resume 2"
                  value={selectedResume?.name}
                  onChange={(val) => console.log(val)}
                  id="name"
                />
              </div>

              <div className="flex gap-3 justify-center items-center">
                <Button
                  variant="outline-primary"
                  rounded
                  onClick={() => setRenameModal(false)}
                >
                  Cancel
                </Button>
                <Button rounded onClick={() => {}} size="lg">
                  Update
                </Button>
              </div>
            </Modal>
          </div>
        )}
        <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete ${"Selected Applicant Kit"}?`}
          desc="Are you sure you want to delete the selected applicant kit? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
      </section>
    </DefaultLayout>
  );
};

export default JobHub;
