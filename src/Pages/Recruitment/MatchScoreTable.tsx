import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";
import { TableLoader } from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import paginate from "../../lib/utils/paginate";
import { useQuery } from "@tanstack/react-query";
import cancelIcon from "../../assets/svg/icon-cancel.svg";
import { ActionTooltip } from "../../components/action-tooltip";
import { Icons } from "../../components/icons";
import { ScrollArea } from "../../components/scroll-area";

// const sampleData: any[] | null | undefined = [];

const sampleData = [
  {
    status: "Interested",
    count: "1",
    id: 1,
    matchPercent: "85",
    matchDesc: "Not tailored",
    name: "Elizabeth Grace",
  },
  {
    status: "Rejected",
    count: "2",
    id: 2,
    job: null,
    matchPercent: "30",
    matchDesc: "Not tailored",
    name: "John Doe",
  },
  {
    status: "Rejected",
    count: "2",
    id: 2,
    job: null,
    matchPercent: "60",
    matchDesc: "Not tailored",
    name: "Helen Paul",
  },
];

const MatchScoreTable = ({ setMatchScoreAlert, setMatchJob }: any) => {
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
    <>
      <div className="mt-10">
        {isFetching ? (
          <TableLoader />
        ) : sampleData?.length != 0 ? (
          <>
            <div>
              <button className="flex gap-2 items-center bg-[#E0E0E080] py-2 px-4 rounded-md text-sm">
                <Icons.edit className=" group-hover:text-black" />
                Edit Applicant
              </button>
            </div>
            <div className="mt-10">
              <ScrollArea className="h-[60vh]">
                <Table show>
                  <Table.TableRow>
                    <Table.Row>
                      <p className="text-base">Rank</p>
                    </Table.Row>
                    <Table.Row>
                      <p className="text-base">Name</p>
                    </Table.Row>
                    <Table.Row>
                      <p className="text-base">Match Score</p>
                    </Table.Row>
                    <Table.Row>
                      <p className="text-base">Actions</p>
                    </Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedResume(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell>
                          <p className="text-sm">{item?.count}</p>
                        </Table.Cell>
                        <Table.Cell isAction>
                          {item?.name ? (
                            <div>
                              <p className="text-sm">{item?.name}</p>
                            </div>
                          ) : (
                            <div>
                              <img src={cancelIcon} className="-ml-4 -mt-3" />
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <p
                              className={`text-base ${
                                item.matchPercent > 75
                                  ? "text-green-500"
                                  : item.matchPercent > 50
                                  ? "text-yellow-500"
                                  : "text-red-500"
                              }`}
                            >
                              {item.matchPercent}% Match
                            </p>
                            <p className="mt-2 text-xs">{item.matchDesc}</p>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <ActionTooltip label="Delete" side="top">
                            <div
                              // onClick={() => setDeleteAlert(true)}
                              className="group flex p-2 items-center justify-center  transition-colors cursor-pointer"
                            >
                              <Icons.trash className="h-4 w-4 group-hover:text-red-500" />
                              <span className="sr-only">Delete</span>
                            </div>
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
              </ScrollArea>
            </div>
          </>
        ) : (
          <Table.NoData
            onAdd={() => navigate(`/app/tutors/courses/courseupload`)}
            hideButton={true}
            show={
              sampleData === undefined ||
              sampleData === null ||
              sampleData?.length === 0
            }
          >
            <div>
              <h2 className="font-bold mb-3"> Oops!, No Match Score Found</h2>
              <p className="px-4 text-xs">
                To view match score, this Applicant needs to be matched to a job
                description
              </p>
              <div className="flex flex-col gap-8 justify-center mt-7">
                <button
                  onClick={() => {
                    setMatchScoreAlert(false);
                    setMatchJob(true);
                  }}
                  className="rounded-full bg-indigo-600 px-3.5 w-[80%] mx-auto text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Match Job Description
                </button>
                <button
                  onClick={() => setMatchScoreAlert(false)}
                  className="text-sm font-semibold leading-6 text-gray-900 rounded-full border w-[80%] mx-auto hover:bg-indigo-500  hover:text-white border-indigo-600 px-3.5 py-2.5 text-center"
                >
                  Cancel
                </button>
              </div>
            </div>
          </Table.NoData>
        )}
      </div>
    </>
  );
};

export default MatchScoreTable;
