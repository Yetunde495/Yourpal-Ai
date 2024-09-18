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
import Delete from "../../components/modal/Delete";
import AlertDialog from "../../components/modal/AlertDialog";
import MatchScoreTable from "./MatchScoreTable";

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

const TalentHub: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, setSelectedResume] = useState<any>(null);
  const [matchScoreAlert, setMatchScoreAlert] = useState(false);

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
            <Link
              to="#"
              className="rounded-full bg-indigo-600 px-3.5 w-[200px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              New Talent Match
            </Link>
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
                  <MatchScoreTable setMatchScoreAlert={setMatchScoreAlert} />
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
    </section>
  );
};

const CellAction = ({ id }: { id: string }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);

  const handleDelete = (id: string) => {
    // Logic to delete the item by id
    console.log(`Deleting item with id: ${id}`);
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
        <Delete
          show={deleteAlert}
          id={id}
          onHide={() => setDeleteAlert(false)}
          onProceed={handleDelete}
          title="Are you sure?"
          desc="This action cannot be undone."
          okText="Delete"
          cancelText="Cancel"
          isLoading={false}
          isLoadingText="Deleting..."
          icon={<span>🗑️</span>}
        ></Delete>
      )}
    </div>
  );
};

export default TalentHub;
