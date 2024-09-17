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
import { MdCancel } from "react-icons/md";
import Popover from "../../components/Popover";
import { IoMdInformationCircleOutline } from "react-icons/io";
import cancelIcon from "../../assets/svg/icon-cancel.svg"

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
  },
  {
    status: "Rejected",
    name: "Resume 2",
    job: null
  },
];

const JobHub: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, setSelectedResume] = useState<any>(null);

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
            <h1>Create Job</h1>
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
                              <div className="w-full flex gap-3">
                                <span>
                                  {item?.status === "Interested" ? (
                                    <FaStar className="text-primary" />
                                  ) : (
                                    <FaCircleCheck className="text-success" />
                                  )}
                                </span>
                              </div>
                            ),
                            value: item?.status,
                          }}
                        />
                      </Table.Cell>
                      <Table.Cell>{item?.name}</Table.Cell>
                      <Table.Cell isAction>
                         {item?.job ? <div>
                          <p>{item?.job?.position}</p>
                          <p>{item?.job?.companyName}</p>
                        </div> : <div><img src={cancelIcon} className="-ml-4 -mt-3" /></div>}
                        </Table.Cell>
                      <Table.Cell>{"Null"}</Table.Cell>
                      <Table.Cell>{"Null"}</Table.Cell>
                      <Table.Cell>{"Null"}</Table.Cell>
                      <Table.Cell>{"Null"}</Table.Cell>
                      <Table.Cell isAction></Table.Cell>
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
    </section>
  );
};

export default JobHub;
