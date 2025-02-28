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
import Modal from "../../components/modal";
import FieldInput from "../../components/form/Input";
import Button from "../../components/button";
import Delete from "../../components/modal/Delete";

const sampleData = [
  {
    tag: "Job Seeker",
    id: 1,
    dateModified: "Jul 01, 2024",
  },
  {
    tag: "Recruiter",
    id: 2,
    dateModified: "Jul 01, 2024",
  },
];

const ManageTags = () => {
  const navigate = useNavigate();
  const [allResumes, setAllResumes] = useState<any>([]);
  const [selectedTag, setSelectedTag] = useState<any>(null);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);

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
        <section className="sm:block py-8">
          <Breadcrumb
            pageName="Manage Tags"
            homeRoute="/app/persona"
            homeRouteName="Personas"
          />

          <section>
            <h1 className="text-xl lg:text-2xl font-semibold">Manage Tags</h1>
            <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap mt-10">
              <div className="mt-2 flex gap-5 items-center">
                <div className="relative">
                  <button className="absolute top-1/2 left-0 -translate-y-1/2 pl-3">
                    <Icons.search />
                  </button>

                  <input
                    type="text"
                    placeholder="Search Tags"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full lg:w-80 border  border-stroke py-2.5 rounded-full bg-white text-sm pr-3 pl-8 focus:outline-none focus:border-1 focus:border-primary"
                  />
                </div>
              </div>

              <div className="ml-auto">
                <Button
                  rounded
                  onClick={() => {
                    setAddModal(true);
                  }}
                >
                  Add New Tag
                </Button>
              </div>
            </div>
          </section>

          <div className="mt-10">
            {isFetching ? (
              <TableLoader />
            ) : allResumes?.length === 0 ? (
              <>
                <Table show>
                  <Table.TableRow>
                    <Table.Row>Name</Table.Row>
                    <Table.Row>Date Created</Table.Row>
                    <Table.Row>Last Updated</Table.Row>
                    <Table.Row>Actions</Table.Row>
                  </Table.TableRow>

                  <Table.TableItems>
                    {sampleData?.map((item: any, index: number) => (
                      <Table.CellRows
                        useSelectOption={false}
                        onClick={() => setSelectedTag(item)}
                        key={item?.id + "-" + index}
                      >
                        <Table.Cell>{item.tag}</Table.Cell>
                        <Table.Cell>Jan 1, 2024</Table.Cell>
                        <Table.Cell>
                          <p className="text-sm text-black">
                            {item.dateModified}
                          </p>
                        </Table.Cell>
                        <Table.Cell isAction>
                          <StaggeredDropDown>
                            <AnimatedOption
                              text="Edit Tag"
                              onClick={() => {
                                setEditModal(true);
                              }}
                            />
                            <AnimatedOption
                              text="Delete Tag"
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
          <AddNewTag
            show={addModal}
            onClose={() => {
              setAddModal(false);
            }}
          />
        )}
        {editModal && (
          <EditTag
            show={editModal}
            onClose={() => setEditModal(false)}
            tagData={selectedTag}
          />
        )}
        <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete Tag?`}
          desc="Are you sure you want to delete this tag? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
      </section>
    </DefaultLayout>
  );
};

const AddNewTag: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
  const [name, setName] = useState("");
  return (
    <div className="">
      <Modal
        show={show}
        onHide={onClose}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-6 text-center">
          <h1 className="font-outfit font-medium text-[30px]">Add New Tag</h1>
          <p className="font-medium hidden">Placeholder for description</p>
        </div>

        <div className="mb-9">
          <FieldInput
            label="Tag"
            placeholder="Ex: Job Seeker"
            value={name}
            onChange={(val) => setName(val)}
            id="url"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <Button variant="outline-primary" rounded onClick={onClose}>
            Cancel
          </Button>
          <Button rounded onClick={() => {}} size="lg">
            Save
          </Button>
        </div>
      </Modal>
    </div>
  );
};

const EditTag: React.FC<{
  show: boolean;
  onClose: () => void;
  tagData: any;
}> = ({ show, onClose, tagData }) => {
  const [name, setName] = useState(tagData?.tag || "");
  return (
    <div className="">
      <Modal
        show={show}
        onHide={onClose}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
        <div className="mb-6 text-center">
          <h1 className="font-outfit font-medium text-[30px]">Edit Tag</h1>
          <p className="font-medium hidden">Placeholder for description</p>
        </div>

        <div className="mb-9">
          <FieldInput
            label="Tag"
            placeholder="Ex: Job Seeker"
            value={name}
            onChange={(val) => setName(val)}
            id="url"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <Button variant="outline-primary" rounded onClick={onClose}>
            Cancel
          </Button>
          <Button rounded onClick={() => {}} size="lg">
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageTags;
