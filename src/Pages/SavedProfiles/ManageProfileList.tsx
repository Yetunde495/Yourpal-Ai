import { useState } from "react";
import { MultiDropdown } from "../../components/form/customDropdown";
import Modal from "../../components/modal";
import Button from "../../components/button";


const ManageProfileList: React.FC<{
  show: boolean;
  onClose: () => void;
  profileData: any;
}> = ({ show, onClose, profileData }) => {
  const [allLists, _setAllLists] = useState<any[]>([
    "Recruiter",
    "Prospects",
    "Client",
    "Example List 1",
    "Example List 2"
  ]);
  const [_search, setSearch] = useState("");

  return (
    <div className="">
      <Modal show={show} onHide={onClose} props={{roundedMd:true}} size="w-full lg:max-w-[550px]">
        <div className="w-full text-center relative">
        <div className="mb-6">
          <h1 className="font-outfit font-medium text-[32px]">List Manager</h1>
          <p className="font-medium">Add or Remove <span className="font-bold">{profileData?.name}</span> from a List</p>
        </div>

        <div className="mb-16">
          <MultiDropdown
            label=""
            placeholder="Search or select a list to add Profile to"
            props={{maxHeight: 'max-h-[120px]'}}
            options={allLists?.map((d: any) => ({
              value: d,
              label: d,
            }))}
            defaultValue={profileData?.lists?.map((d: any) => ({
              value: d,
              label: d,
            }))}
            setSearch={setSearch}
            onSelect={(_val: any) => {
              // onSelect(val);
            }}
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
            <Button variant="outline-primary" rounded onClick={onClose}>Cancel</Button>
            <Button rounded onClick={() => {}}>Save Changes</Button>
        </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageProfileList;
