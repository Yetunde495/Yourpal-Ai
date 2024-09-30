import DefaultLayout from "../../layout/DefaultLayout";
import { Icons } from "../../components/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Notification from "../../components/Notification";
import { toast } from "react-toastify";
import paginate from "../../lib/utils/paginate";
import { TableLoader } from "../../components/Loader";
import Table from "../../components/table";
import TablePagination from "../../components/table/TablePagination";
import { useQuery } from "@tanstack/react-query";
import Breadcrumb from "../../components/BreadCrumb";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import Button from "../../components/button";
import AddNewList, { EditList } from "./NewList";
import Delete from "../../components/modal/Delete";

const sampleData = [
  {
    name: "Recruiter",
    id: 1,
    dateModified: "Jul 01, 2024",
  },
  {
    name: "Client",
    id: 2,
    dateModified: "Jul 01, 2024",
  },
];

const ManageList = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [selectedList, setSelectedList] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
        <section className="sm:block py-8">
          <Breadcrumb
            pageName="Manage Lists"
            homeRoute="/app/saved-profiles"
            homeRouteName="Saved Profiles"
          />

          <section>
            <h1 className="text-xl lg:text-2xl font-semibold">Manage Lists</h1>
            <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap mt-6">
              <div className="mt-2 flex gap-5 items-center">
                <div className="relative">
                  <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                    <Icons.search />
                  </button>

                  <input
                    type="text"
                    placeholder="Search Lists"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                  />
                </div>
              </div>

              <div className="ml-auto flex items-center gap-2">
                {selectedItems.length > 0 && (
                  <Button rounded variant="outline-primary" onClick={() => {setDeleteModal(true)}}>
                    Delete Lists
                  </Button>
                )}
                <Button
                  rounded
                  onClick={() => {
                    setAddModal(true);
                  }}
                >
                  Add New List
                </Button>
              </div>
            </div>
          </section>

          <div className="mt-8">
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
                    <Table.Row>Date Created</Table.Row>
                    <Table.Row>Last Updated</Table.Row>
                    <Table.Row>Actions</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedList(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell cellIndex={0}>
                          <Table.RowCheckInput
                            id={item?.id}
                            isChecked={selectedItems.includes(item.id)}
                            onChecked={() => handleCheckboxClick(item.id)}
                          />
                        </Table.Cell>
                        <Table.Cell>{item.name}</Table.Cell>
                        <Table.Cell>Jan 1, 2024</Table.Cell>
                        <Table.Cell>
                          <p className="text-sm text-black">
                            {item.dateModified}
                          </p>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <StaggeredDropDown>
                            <AnimatedOption
                              text="Edit List"
                              onClick={() => {
                                setEditModal(true)
                              }}
                            />
                            <AnimatedOption
                              text="Delete List"
                              onClick={() => {setDeleteModal(true)}}
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
        {addModal && (
          <AddNewList
            show={addModal}
            onClose={() => {
              setAddModal(false);
            }}
          />
        )}
        {editModal && (
          <EditList show={editModal} onClose={() => setEditModal(false)} listData={selectedList} />
        )}
         <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete ${selectedItems.length > 0 ? 'Selected List(s)' : 'List'}?`}
          desc="Are you sure you want to delete? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
      </section>
    </DefaultLayout>
  );
};

export default ManageList;
