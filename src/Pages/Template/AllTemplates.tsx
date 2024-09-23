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
import {
  getAllIdsInArray,
  idExistInArray,
  toggleIdInArray,
} from "../../lib/utils";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import Delete from "../../components/modal/Delete";

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
  const [selectedResume, setSelectedResume] = useState<any>(null);

  const [singleSelect, setSingleSelect] = useState<string>("");
  const [multiSelect, setMultiSelect] = useState<string[]>([]);
  const [deleteModal, setDeleteModal] = useState(false)

  const enableDelete = singleSelect || multiSelect?.length > 0 ? true : false;
  const enableViewData =
    singleSelect || multiSelect?.length === 1 ? true : false;

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

  const handleViewItem = () => {
    let user;
    if (singleSelect) {
      user = singleSelect;
    }

    if (multiSelect && multiSelect?.length === 1) {
      user = multiSelect[0] as any;
      navigate("/app/users/" + user);
    }
    if (!user) return;

    navigate("/app/users/" + user);
  };
  //   const handleRemoveItem = () => {
  //     if (!singleSelect && multiSelect?.length < 1) return;
  //     //    setShowWarning(true);
  //   };
  //   const handleAddItem = () => navigate("/app/users/create");
  //functions to handle table input selections
  const handleMultiCheckItem = (id: string) =>
    setMultiSelect((prevState: Array<string>) =>
      toggleIdInArray([...prevState], id)
    );
  const handleToggleSelectAllItems = () =>
    multiSelect.length !== sampleData?.length
      ? setMultiSelect((_prevState: Array<string>) => [
          ...getAllIdsInArray(sampleData, "id"),
        ])
      : setMultiSelect((_prevState: Array<string>) => []);
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

            <div className="ml-auto">
              <button className="px-6 py-1.5 rounded-full bg-primary text-white hover:opacity-95" onClick={() => navigate('new-template')}>
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
                        isChecked={multiSelect.length > 0}
                        onChecked={handleToggleSelectAllItems}
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
                        onClick={() => setSelectedResume(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell cellIndex={0}>
                          <Table.RowCheckInput
                            id={item?.id}
                            isChecked={idExistInArray(multiSelect, item?.id)}
                            onChecked={handleMultiCheckItem}
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
                              onClick={() => {navigate(`edit-template`)}}
                            />
                            <AnimatedOption
                              text="Duplicate Template"
                              onClick={() => {}}
                            />
                            <AnimatedOption
                              text="Delete Template"
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
                onAdd={() => {}}
                title="No Template Found"
                hideButton={true}
                show={
                  allResumes === undefined ||
                  allResumes === null ||
                  allResumes?.length === 0
                }
              >
              Click the  'Add New Template'  button at the top to create a new template
              </Table.NoData>
            )}
          </div>
        </section>
        <Delete
         show={deleteModal}
         onHide={() => {setDeleteModal(false)}}
         title="Delete Template"
         desc="Are you sure you want to delete this template? This action is irreversible"
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
