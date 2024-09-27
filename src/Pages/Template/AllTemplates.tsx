import { BiSearch } from "react-icons/bi";
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
import Popover from "../../components/Popover";
import { IoMdInformationCircleOutline } from "react-icons/io";
import DefaultLayout from "../../layout/DefaultLayout";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import Delete from "../../components/modal/Delete";
import Button from "../../components/button";

const sampleData = [
  {
    tag: "Job Seeker",
    id: "123",
    name: "Resume 1",
    job: {
      position: "IT Manager",
      companyName: "ABCD",
    },
  },
  {
    tag: "Recruiter",
    id: "234",
    name: "Resume 2",
    job: null,
  },
];

const AllTemplates: React.FC = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [_selectedTemplate, setSelectedTemplate] = useState<any>(null);

  const [deleteModal, setDeleteModal] = useState(false);

  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<any[]>([]);

  const [search, setSearch] = useState<string>("");

  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { data, isFetching } = useQuery(
    ["ALL TEMPLATES", search, page, itemsPerPage],
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

  const handleCheckboxClick = (id: string | number) => {
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
            Templates
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

            <div className="ml-auto flex items-center gap-2">
              {selectedItems.length > 0 && (
                <Button
                  rounded
                  variant="outline-primary"
                  onClick={() => {
                    setDeleteModal(true);
                  }}
                >
                  Delete Templates
                </Button>
              )}
              <button
                className="px-6 py-1.5 rounded-full bg-primary text-white hover:opacity-95"
                onClick={() => navigate("new-template")}
              >
                Add New Template
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
                    <Table.Row rowIndex={0}>
                      <Table.RowCheckInput
                        id="000"
                        isChecked={selectAll || selectedItems.length > 0}
                        onChecked={handleSelectAll}
                      />
                    </Table.Row>

                    <Table.Row>Name</Table.Row>
                    <Table.Row>Tag</Table.Row>
                    <Table.Row>Date Created</Table.Row>
                    <Table.Row>Last Modified</Table.Row>
                    <Table.Row>Actions</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedTemplate(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell cellIndex={0}>
                          <Table.RowCheckInput
                            id={item?.id}
                            isChecked={selectedItems.includes(item.id)}
                            onChecked={() => handleCheckboxClick(item.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{item?.name}</Table.Cell>
                        <Table.Cell>{item?.tag}</Table.Cell>
                        <Table.Cell>Jan 1, 2024</Table.Cell>
                        <Table.Cell>May 6, 2024</Table.Cell>

                        <Table.Cell isAction>
                          <StaggeredDropDown>
                            <AnimatedOption
                              text="Edit Template"
                              onClick={() => {
                                navigate(`edit-template`);
                              }}
                            />
                            <AnimatedOption
                              text="Duplicate Template"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Delete Template"
                              onClick={() => {
                                setDeleteModal(true);
                              }}
                            />
                          </StaggeredDropDown>
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
                onAdd={() => {}}
                title="No Template Found"
                hideButton={true}
                show={
                  allResumes === undefined ||
                  allResumes === null ||
                  allResumes?.length === 0
                }
              >
                Click the 'Add New Template' button at the top to create a new
                template
              </Table.NoData>
            )}
          </div>
        </section>
        <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete ${
            selectedItems.length > 0 ? "Selected Template(s)" : "Template"
          } ?`}
          desc="Are you sure you want to delete the selected template(s)? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
      </section>
    </DefaultLayout>
  );
};

export default AllTemplates;
