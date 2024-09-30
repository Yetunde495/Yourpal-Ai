import { useState } from "react";
import Button from "../../components/button";
import FieldInput from "../../components/form/Input";
import Modal from "../../components/modal";

const AddNewList: React.FC<{
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
          <h1 className="font-outfit font-medium text-[30px]">Lists</h1>
          <p className="font-medium">Add a new list</p>
        </div>

        <div className="mb-9">
          <FieldInput
            label="List Name"
            placeholder="E.g Co-worker"
            value={name}
            onChange={(val) => setName(val)}
            id="url"
          />
        </div>

        <div className="flex gap-3 justify-center items-center">
          <Button variant="outline-primary" rounded onClick={onClose} >
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

export const EditList: React.FC<{
    show: boolean;
    onClose: () => void;
    listData: any;
  }> = ({ show, onClose, listData }) => {
    const [name, setName] = useState(listData?.name || "");
    return (
      <div className="">
        <Modal
          show={show}
          onHide={onClose}
          props={{ roundedMd: true }}
          size="w-full lg:max-w-[600px]"
        >
          <div className="mb-6 text-center">
            <h1 className="font-outfit font-medium text-[30px]">Lists</h1>
            <p className="font-medium">Edit list</p>
          </div>
  
          <div className="mb-9">
            <FieldInput
              label="List Name"
              placeholder="E.g Co-worker"
              value={name}
              onChange={(val) => setName(val)}
              id="name"
            />
          </div>
  
          <div className="flex gap-3 justify-center items-center">
            <Button variant="outline-primary" rounded onClick={onClose} >
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

export default AddNewList;
