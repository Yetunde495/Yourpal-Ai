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
import TablePagination from "../../components/table/TablePagination";
import PersonaImg from "../../assets/pseronaImg.png";
import Delete from "../../components/modal/Delete";
import Avatar from "../../components/Avatar2";
import getUserInitials from "../../lib/utils/getUserInitials";
import Button from "../../components/button";
import StaggeredDropDown, {
  AnimatedOption,
} from "../../AnimatedUi/staggeredDropdown";
import ManageProfileList from "./ManageProfileList";
import AddNewProfile from "./NewProfile";
import { TableSort } from "../../components/form/customDropdown";

const sampleData = [
  {
    id: 1,
    photo_url: PersonaImg,
    name: "Henry Peters",
    profession: "Product Designer",
    lists: ["Prospects", "Client", "Recruiter"],
  },
  {
    id: 2,
    photo_url: "",
    name: "Elizabeth Parker",
    profession: "Software Engineer",
    lists: ["Prospects"],
  },
  {
    id: 3,
    photo_url: "",
    name: "Kim Taeyeon",
    profession: "Project Manager",
    lists: [],
  },
];

const orderOptions = [
  {
  label: 'Newest to Oldest',
  value: 'asc'
},
{
  label: 'Oldest to Newest',
  value: 'desc'
}
]

const AllSavedProfiles: React.FC = () => {
  const navigate = useNavigate();
  const [allProfiles, setAllProfiles] = useState<any>([]);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [manageModal, setManageModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [order, setOrder] = useState('asc')
  

  const { data, isFetching } = useQuery(
    ["ALL_SAVED_PROFILES", search, page, itemsPerPage, order],
    () => {},
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
      enabled: false,
      onSuccess: (data: any) => {
        setAllProfiles(data?.resumes);
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
            Saved Profiles
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
                  placeholder="Search Profiles"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                />
              </div>

              <div>
              

              <TableSort
               options={orderOptions}
               placeholder="Newest to Oldest"
               onSelect={(val) => {
                  setOrder(val?.value)
               }}
               defaultValue={orderOptions[0]}

              />
            </div>
              
              <div className="">
                <Link to="manage-list" className="underline text-primary">
                  Manage List
                </Link>
              </div>
            </div>

            <div className="ml-auto flex items-center gap-2">
            {selectedItems.length > 0 && (
                  <Button rounded variant="outline-primary" onClick={() => {setDeleteModal(true)}}>
                    Delete Lists
                  </Button>
                )}
              <Button rounded onClick={() => setAddModal(true)}>
                Add New Profile
              </Button>
            </div>
          </div>

          <div className="mt-10">
            {isFetching ? (
              <TableLoader />
            ) : allProfiles?.length === 0 ? (
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
                    <Table.Row>Lists</Table.Row>
                    <Table.Row isLastItem>Actions</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedProfile(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell cellIndex={0}>
                          <Table.RowCheckInput
                            id={item?.id}
                            isChecked={selectedItems.includes(item.id)}
                            onChecked={() => handleCheckboxClick(item.id)}
                          />
                        </Table.Cell>

                        <Table.Cell isAction>
                          <div className="flex gap-3 items-center text-black">
                            <Avatar
                              src={item?.photo_url}
                              size="small"
                              initials={getUserInitials(
                                item?.name || "User",
                                ""
                              )}
                            />
                            <div>
                              <p className="mb-[2px] font-medium">
                                {item?.name}
                              </p>
                              <p>{item?.profession}</p>
                            </div>
                          </div>
                        </Table.Cell>
                        <Table.Cell isAction>
                          {item?.lists && item?.lists.length > 0 ? (
                            <div className="flex items-center gap-2">
                              {item?.lists.map((val: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-3 py-1.5 rounded-full bg-[#077AB21A]"
                                >
                                  {val}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm px-3">Null</p>
                          )}
                        </Table.Cell>
                        <Table.Cell isAction>
                          <div className="flex items-center gap-2">
                            <Button
                              rounded
                              variant="outline-primary"
                              onClick={() => {}}
                            >
                              See Recent Activity
                            </Button>
                            <div>
                              <StaggeredDropDown>
                                <AnimatedOption
                                  text="Manage Profile's List"
                                  onClick={() => {
                                    setManageModal(true);
                                  }}
                                />
                                <AnimatedOption
                                  text="Copy Profile URL"
                                  onClick={() => {
                                    navigator.clipboard.writeText(
                                      item?.profile_url
                                    );
                                    alert("text copied!");
                                  }}
                                />
                                <AnimatedOption
                                  text="Delete Profile"
                                  onClick={() => {
                                    setDeleteModal(true);
                                  }}
                                />
                              </StaggeredDropDown>
                            </div>
                          </div>
                        </Table.Cell>
                      </Table.CellRows>
                    ))}
                  </Table.TableItems>
                </Table>

                <TablePagination
                  data={allProfiles}
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
                  allProfiles === undefined ||
                  allProfiles === null ||
                  allProfiles?.length === 0
                }
                title="You have not saved any Profiles"
              >
                Lorem ipsum dolor sit amet
              </Table.NoData>
            )}
          </div>
        </section>
        <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete ${selectedItems.length > 0 ? 'Selected Profile(s)' : 'Profile'}?`}
          desc="Are you sure you want to delete this profile? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
        {manageModal && (
          <ManageProfileList
            show={manageModal}
            onClose={() => setManageModal(false)}
            profileData={selectedProfile}
          />
        )}
        {addModal && (
          <AddNewProfile show={addModal} onClose={() => setAddModal(false)} />
        )}
        
      </section>
    </DefaultLayout>
  );
};

export default AllSavedProfiles;
