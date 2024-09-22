import { useState } from "react";
import Popover from "../../components/Popover";
import DefaultLayout from "../../layout/DefaultLayout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { Icons } from "../../components/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Notification from "../../components/Notification";
import paginate from "../../lib/utils/paginate";
import { TableLoader } from "../../components/Loader";
import Table from "../../components/table";
import { useQuery } from "@tanstack/react-query";
import cancelIcon from "../../assets/svg/icon-cancel.svg";
import TablePagination from "../../components/table/TablePagination";
import PersonaImg from "../../assets/pseronaImg.png";
import Delete from "../../components/modal/Delete";

const sampleData = [
  {
    status: "Interested",
    tag: "Job Seeker",
    id: 1,
    job: {
      imgSrc: PersonaImg,
      companyName: "Henry Peters",
    },
  },
  {
    status: "Rejected",
    tag: "Recruiter",
    id: 2,
    job: {
      imgSrc: PersonaImg,
      companyName: "John Doe",
    },
  },
];

const PersonaMgt: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedResume, setSelectedResume] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

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

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      setSelectedItems(sampleData.map((item) => item.id));
    }
    setSelectAll(!selectAll);
  };

  const handleCheckboxClick = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  return (
    <DefaultLayout>
      <section className="pb-6 px-4 md:px-6">
        <div className="flex gap-2 items-center pt-4">
          <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
            Personas
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
          <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap ">
            <div className="mt-2 flex gap-5 items-center">
              <div className="relative">
                <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                  <Icons.search />
                </button>

                <input
                  type="text"
                  placeholder="Search Persona"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                />
              </div>
              <div className="relative">
                <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                  <Icons.filter />
                </button>

                <input
                  type="text"
                  placeholder="Filter By"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                />
              </div>
              <div className="">
                <Link
                  to="manage-tags"
                  className="underline text-primary"
                >
                  Manage Tag
                </Link>
              </div>
            </div>

            <div className="ml-auto">
              <Link
                to="add-persona"
                className="rounded-full bg-indigo-600 px-3.5 w-[160px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 flex items-center gap-2"
              >
                <Icons.add />
                Add Persona
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
                    <Table.Row rowIndex={0}>
                      <Table.RowCheckInput
                        id="000"
                        isChecked={selectAll || selectedItems.length > 0}
                        onChecked={handleSelectAll}
                      />
                    </Table.Row>
                    <Table.Row>Name</Table.Row>
                    <Table.Row>Tag</Table.Row>
                    <Table.Row isLastItem>Actions</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedResume(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell cellIndex={0}>
                          <Table.RowCheckInput
                            id={item?.id}
                            isChecked={selectedItems.includes(item.id)}
                            onChecked={() => handleCheckboxClick(item.id)}
                          />
                        </Table.Cell>
                        
                        <Table.Cell>
                          {item?.job ? (
                            <div className="flex gap-3 items-center text-black text-sm">
                              <img src={item?.job?.imgSrc} />
                              <p>{item?.job?.companyName}</p>
                            </div>
                          ) : (
                            <div>
                              <img src={cancelIcon} className="-ml-4 -mt-3" />
                            </div>
                          )}
                        </Table.Cell>
                        <Table.Cell>
                          <p className="text-sm text-black">{item.tag}</p>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <CellAction id={item.id} />
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
      </section>
    </DefaultLayout>
  );
};

const CellAction = ({id}: { id:string }) => {
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
    <div className="flex w-full items-center justify-center gap-2">
      <div
        onClick={() => setDeleteAlert(true)}
        className="group flex p-2 items-center justify-center  transition-colors cursor-pointer"
      >
        <p className="text-red-500 underline">Delete</p>
      </div>
      <button className="text-xs text-primary border border-primary py-1 px-7 rounded-full">
        Edit
      </button>
      {deleteAlert && (
        <Delete
          show={deleteAlert}
          onHide={() => setDeleteAlert(false)}
          title="Delete Tag?"
          desc="Are you sure you want to remove this tag?"
          onProceed={() => {handleDelete(id)}}
          isLoading={false}
          isLoadingText="Deleting..."
        /> 
      )}
    </div>
  );
};

export default PersonaMgt;
